import { Public } from './../../decorators/public.decorator';
import { Controller, Post, Body, Inject, Get, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyPhoneDto } from './dto/verify-phone.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { Temporary } from 'src/decorators/temporary.decorator';
import { CompleteProfileDto } from './dto/complete-profile.dto';
import { ConfirmAccountDto } from './dto/confirm-account.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    @Inject('AUTHENTICATION_SERVICE') private readonly authService: ClientProxy,
  ) {}

  // Login
  @ApiBody({ type: LoginDto })
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log('dto', loginDto);
    const res = await firstValueFrom(
      this.authService.send({ cmd: 'login' }, loginDto),
    );
    console.log('res', res);
    return res;
  }

  // Register
  @ApiBody({ type: RegisterDto })
  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const res = await lastValueFrom(
      this.authService.send({ cmd: 'register' }, registerDto),
    );
    return res;
  }

  // Verify Email
  @Temporary()
  @Post('confirm-account')
  async confirmAccount(
    @Req() req,
    @Body() confirmAccountDto: ConfirmAccountDto,
  ) {
    const res = await lastValueFrom(
      this.authService.send(
        { cmd: 'confirm-account' },
        { user: req.user, otp: confirmAccountDto.otp },
      ),
    );
    return res;
  }

  // Profile
  @Get('profile')
  async profile(@Req() req: any) {
    const user = req.user;
    // Logger.log('user', user);
    const res = await lastValueFrom(
      this.authService.send({ cmd: 'get-profile' }, { id: user._id }),
    );
    return res;
  }

  // Refresh Token
  @Public()
  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    // Logger.log('user', user);
    const res = await lastValueFrom(
      this.authService.send({ cmd: 'refresh-token' }, refreshTokenDto),
    );
    return res;
  }

  // Logout
  @Post('logout')
  async logout(@Req() req: any) {
    const user = req.user;
    const res = await lastValueFrom(
      this.authService.send({ cmd: 'logout' }, { id: user._id }),
    );
    return res;
  }

  // Send Otp
  @Public()
  @Post('send-otp')
  async verifyPhone(@Body() sendOtpDto: SendOtpDto) {
    const res = await lastValueFrom(
      this.authService.send({ cmd: 'send-otp' }, sendOtpDto),
    );
    return res;
  }

  // verify Phone
  @Public()
  @Post('verify-phone')
  async sendOtp(@Body() verifyPhoneDto: VerifyPhoneDto) {
    const res = await lastValueFrom(
      this.authService.send(
        { cmd: 'send-otp' },
        { credential: verifyPhoneDto.phone },
      ),
    );
    return res;
  }

  // verify Otp
  @Temporary()
  @Post('verify-otp')
  async verifyOtp(@Req() req, @Body() verifyOtp: VerifyOtpDto) {
    const res = await lastValueFrom(
      this.authService.send(
        { cmd: 'verify-otp' },
        { ...verifyOtp, ...req.user },
      ),
    );
    return res;
  }

  // Complete Profile
  @Post('complete-profile')
  async completeProfile(
    @Req() req,
    @Body() completeProfileDto: CompleteProfileDto,
  ) {
    const res = await lastValueFrom(
      this.authService.send(
        { cmd: 'complete-profile' },
        { completeProfileDto, user: req.user },
      ),
    );
    return res;
  }
}
