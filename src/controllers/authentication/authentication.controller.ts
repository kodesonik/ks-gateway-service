import { Public } from './../../decorators/public.decorator';
import { Controller, Post, Body, Inject, Get, Req } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
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
  @ApiOperation({ summary: 'Login' })
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
  @ApiOperation({ summary: 'Register' })
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
  @ApiOperation({ summary: 'Confirm Account' })
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
  @ApiOperation({ summary: 'Get profile' })
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
  @ApiOperation({ summary: 'Refresh Token' })
  @ApiOkResponse({ description: 'Token refreshed successfully' })
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
  @ApiOperation({ summary: 'Logout' })
  @ApiOkResponse({ description: 'Logout successful' })
  @Post('logout')
  async logout(@Req() req: any) {
    const user = req.user;
    return await msResponseFormatter(
      this.authService.send({ cmd: 'logout' }, { id: user._id }),
    );
  }

  // Send Otp
  @ApiOperation({ summary: 'Send OTP' })
  @ApiOkResponse({ description: 'OTP sent successfully' })
  @Public()
  @Post('send-otp')
  async verifyPhone(@Body() sendOtpDto: SendOtpDto) {
    return await msResponseFormatter(
      this.authService.send({ cmd: 'send-otp' }, sendOtpDto),
    );
  }

  // verify Phone
  @ApiOperation({ summary: 'Verify Phone' })
  @ApiOkResponse({ description: 'Phone verified successfully' })
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
  @ApiOperation({ summary: 'Verify OTP' })
  @ApiOkResponse({ description: 'OTP verified successfully' })
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
  @ApiOperation({ summary: 'Complete profile' })
  @ApiOkResponse({ description: 'Profile completed successfully' })
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
  @ApiOperation({ summary: 'Change username' })
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
  @ApiOperation({ summary: 'Change email' })
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
  @ApiOperation({ summary: 'Change phone number' })
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
  @ApiOperation({ summary: 'Confirm email change' })
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
  @ApiOperation({ summary: 'Confirm phone change' })
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

  @ApiOperation({ summary: 'Forgot password' })
  @ApiOkResponse({ description: 'Password reset initiated' })
  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await msResponseFormatter(
      this.authService.send(
        { cmd: 'forgot-password' },
        { credential: forgotPasswordDto.credential },
      ),
    );
  }

  @ApiOperation({ summary: 'Reset password' })
  @ApiOkResponse({ description: 'Password reset successful' })
  @Public()
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
  @ApiOperation({ summary: 'Change password' })
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
  @ApiOperation({ summary: 'Initiate account deletion' })
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
  @ApiOperation({ summary: 'Confirm account deletion' })
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

  @ApiOperation({ summary: 'Check username availability' })
  @ApiBody({ schema: { properties: { username: { type: 'string' } } } })
  @ApiOkResponse({ description: 'Username availability checked' })
  @Public()
  @Post('check-username')
  async checkUsername(@Body() checkUsernameDto: { username: string }) {
    return await msResponseFormatter(
      this.authService.send({ cmd: 'check-username' }, checkUsernameDto),
    );
  }

  @ApiOperation({ summary: 'Check email availability' })
  @ApiBody({ schema: { properties: { email: { type: 'string' } } } })
  @ApiOkResponse({ description: 'Email availability checked' })
  @Public()
  @Post('check-email')
  async checkEmail(@Body() checkEmailDto: { email: string }) {
    return await msResponseFormatter(
      this.authService.send({ cmd: 'check-email' }, checkEmailDto),
    );
  }

  @ApiOperation({ summary: 'Check phone number availability' })
  @ApiBody({ schema: { properties: { phone: { type: 'string' } } } })
  @ApiOkResponse({ description: 'Phone number availability checked' })
  @Public()
  @Post('check-phone')
  async checkPhone(@Body() checkPhoneDto: { phone: string }) {
    return await msResponseFormatter(
      this.authService.send({ cmd: 'check-phone' }, checkPhoneDto),
    );
  }
}
