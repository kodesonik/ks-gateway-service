import { Public } from './../../decorators/public.decorator';
import { Controller, Post, Body, Inject, Get, Req } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyPhoneDto } from './dto/verify-phone.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { Temporary } from 'src/decorators/temporary.decorator';
import { CompleteProfileDto } from './dto/complete-profile.dto';
import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { AuthResponse } from 'src/types';
import { msResponseFormatter } from 'src/helpers';

@ApiTags('Authentication')
@ApiHeader({
  name: 'x-lang',
  description: 'Language',
  required: false,
  example: 'en',
})
@Controller('auth')
export class AuthenticationController {
  constructor(
    @Inject('AUTHENTICATION_SERVICE') private readonly authService: ClientProxy,
  ) {}

  // Login
  @ApiOkResponse({ type: AuthResponse })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // console.log('dto', loginDto);
    return await msResponseFormatter(
      this.authService.send({ cmd: 'login' }, loginDto),
    );
  }

  // Register
  @ApiOkResponse({ type: AuthResponse })
  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
    return await msResponseFormatter(
      this.authService.send({ cmd: 'register' }, registerDto),
    );
  }

  // Verify Email
  @ApiBearerAuth()
  @ApiOkResponse({ type: AuthResponse })
  @Temporary()
  @Post('confirm-account')
  async confirmAccount(
    @Req() req,
    @Body() confirmAccountDto: ConfirmAccountDto,
  ) {
    console.log('confirmAccountDto', req.user);
    return await msResponseFormatter(
      this.authService.send(
        { cmd: 'confirm-account' },
        { user: req.user, otp: confirmAccountDto.otp },
      ),
    );
  }

  // Profile

  @ApiBearerAuth()
  @ApiOkResponse({ type: AuthResponse })
  @Get('profile')
  async profile(@Req() req: any) {
    const user = req.user;
    // Logger.log('user', user);

    return await msResponseFormatter(
      this.authService.send({ cmd: 'get-profile' }, { id: user._id }),
    );
  }

  // Refresh Token
  @Public()
  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    // Logger.log('user', user);
    return await msResponseFormatter(
      this.authService.send({ cmd: 'refresh-token' }, refreshTokenDto),
    );
  }

  // Logout
  @ApiBearerAuth()
  @Post('logout')
  async logout(@Req() req: any) {
    const user = req.user;
    return await msResponseFormatter(
      this.authService.send({ cmd: 'logout' }, { id: user._id }),
    );
  }

  // Send Otp
  @Public()
  @Post('send-otp')
  async verifyPhone(@Body() sendOtpDto: SendOtpDto) {
    return await msResponseFormatter(
      this.authService.send({ cmd: 'send-otp' }, sendOtpDto),
    );
  }

  // verify Phone
  @Public()
  @Post('verify-phone')
  async sendOtp(@Body() verifyPhoneDto: VerifyPhoneDto) {
    return await msResponseFormatter(
      this.authService.send(
        { cmd: 'send-otp' },
        { credential: verifyPhoneDto.phone },
      ),
    );
  }

  // verify Otp
  @ApiBearerAuth()
  @Temporary()
  @Post('verify-otp')
  async verifyOtp(@Req() req, @Body() verifyOtp: VerifyOtpDto) {
    return await msResponseFormatter(
      this.authService.send(
        { cmd: 'verify-otp' },
        { ...verifyOtp, ...req.user },
      ),
    );
  }

  // Complete Profile
  @ApiBearerAuth()
  @Post('complete-profile')
  async completeProfile(
    @Req() req,
    @Body() completeProfileDto: CompleteProfileDto,
  ) {
    return await msResponseFormatter(
      this.authService.send(
        { cmd: 'complete-profile' },
        { completeProfileDto, user: req.user },
      ),
    );
  }
}
