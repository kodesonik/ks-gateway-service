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
import { Temporary } from 'src/decorators/temporary.decorator';
import { AuthResponse } from 'src/types';
import { msResponseFormatter } from 'src/helpers';
import {
  LoginDto,
  RegisterDto,
  RefreshTokenDto,
  SendOtpDto,
  VerifyPhoneDto,
  VerifyOtpDto,
  CompleteProfileDto,
  ConfirmAccountDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  ChangePasswordDto,
  DeleteAccountDto,
  ConfirmChangeDto,
} from './dto';
import { ChangeEmailDto } from './dto/change-email.dto';
import { ChangePhoneDto } from './dto/change-phone.dto';
import { ChangeUsernameDto } from './dto/change-username.dto';

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

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Username changed successfully' })
  @Post('change-username')
  async changeUsername(
    @Req() req,
    @Body() changeUsernameDto: ChangeUsernameDto,
  ) {
    return await msResponseFormatter(
      this.authService.send(
        { cmd: 'change-username' },
        { id: req.user._id, username: changeUsernameDto.username },
      ),
    );
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Email change initiated' })
  @Post('change-email')
  async changeEmail(@Req() req, @Body() changeEmailDto: ChangeEmailDto) {
    return await msResponseFormatter(
      this.authService.send(
        { cmd: 'change-email' },
        { id: req.user._id, email: changeEmailDto.email },
      ),
    );
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Phone change initiated' })
  @Post('change-phone')
  async changePhone(@Req() req, @Body() changePhoneDto: ChangePhoneDto) {
    return await msResponseFormatter(
      this.authService.send(
        { cmd: 'change-phone' },
        { id: req.user._id, phone: changePhoneDto.phone },
      ),
    );
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Email change confirmed' })
  @Post('confirm-change-email')
  async confirmChangeEmail(
    @Req() req,
    @Body() confirmChangeDto: ConfirmChangeDto,
  ) {
    return await msResponseFormatter(
      this.authService.send(
        { cmd: 'confirm-change-email' },
        { id: req.user._id, otp: confirmChangeDto.otp },
      ),
    );
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Phone change confirmed' })
  @Post('confirm-change-phone')
  async confirmChangePhone(
    @Req() req,
    @Body() confirmChangeDto: ConfirmChangeDto,
  ) {
    return await msResponseFormatter(
      this.authService.send(
        { cmd: 'confirm-change-phone' },
        { id: req.user._id, otp: confirmChangeDto.otp },
      ),
    );
  }

  @Public()
  @ApiOkResponse({ description: 'Password reset initiated' })
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await msResponseFormatter(
      this.authService.send(
        { cmd: 'forgot-password' },
        { credential: forgotPasswordDto.credential },
      ),
    );
  }

  @Public()
  @ApiOkResponse({ description: 'Password reset successful' })
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await msResponseFormatter(
      this.authService.send(
        { cmd: 'reset-password' },
        { token: resetPasswordDto.token, password: resetPasswordDto.password },
      ),
    );
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Password changed successfully' })
  @Post('change-password')
  async changePassword(
    @Req() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return await msResponseFormatter(
      this.authService.send(
        { cmd: 'change-password' },
        {
          id: req.user._id,
          oldPassword: changePasswordDto.oldPassword,
          newPassword: changePasswordDto.newPassword,
        },
      ),
    );
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Account deletion initiated' })
  @Post('delete-account')
  async deleteAccount(@Req() req, @Body() deleteAccountDto: DeleteAccountDto) {
    return await msResponseFormatter(
      this.authService.send(
        { cmd: 'delete-account' },
        { id: req.user._id, password: deleteAccountDto.password },
      ),
    );
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Account deletion confirmed' })
  @Post('confirm-delete-account')
  async confirmDeleteAccount(
    @Req() req,
    @Body() confirmChangeDto: ConfirmChangeDto,
  ) {
    return await msResponseFormatter(
      this.authService.send(
        { cmd: 'confirm-delete-account' },
        { id: req.user._id, otp: confirmChangeDto.otp },
      ),
    );
  }
}
