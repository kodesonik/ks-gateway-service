import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IS_PUBLIC_KEY, IS_TEMPORARY_KEY } from 'src/decorators';
import { ResponseCode } from 'src/types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private reflector: Reflector,
    @Inject('AUTHENTICATION_SERVICE') private readonly authService: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (isPublic) {
        // 💡 See this condition
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);

      if (!token) {
        throw new UnauthorizedException(ResponseCode.TOKEN_MISSING);
      }
      const isTemporary = this.reflector.getAllAndOverride<boolean>(
        IS_TEMPORARY_KEY,
        [context.getHandler(), context.getClass()],
      );
      const isRefresh = request.url.includes('refresh');
      let tokenType = 'access';
      if (isTemporary) {
        tokenType = 'temporary';
      }
      if (isRefresh) {
        Logger.log('isRefresh ', 'AuthGuard');
        tokenType = 'refresh';
      }
      const decoded = await firstValueFrom(
        this.authService.send(
          { cmd: 'decode-token' },
          {
            token,
            tokenType,
          },
        ),
      );
      if (!decoded) {
        throw new UnauthorizedException(ResponseCode.TOKEN_INVALID);
      }

      if (decoded.error) {
        throw new UnauthorizedException(decoded.error);
      }
      request.user = decoded;
    } catch (error) {
      // Logger.error(error.message, 'AuthGuard');
      throw new UnauthorizedException(error.message);
    }

    return true;
  }

  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      return null;
    }
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : null;
  }
}
