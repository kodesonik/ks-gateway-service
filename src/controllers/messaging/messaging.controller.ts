import { ClientProxy } from '@nestjs/microservices';
import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { SendMailDto } from './dto/send-mail.dto';
import { firstValueFrom } from 'rxjs';
import { SendSmsDto } from './dto/send-sms.dto';
import { SendOtpDto } from './dto/send-otp-dto';

@Controller('messaging')
export class MessagingController {
  constructor(
    @Inject('MESSAGING_SERVICE')
    private readonly messagingService: ClientProxy,
  ) {}

  @Get()
  async getAllMessages() {
    return this.messagingService.send({ cmd: 'get-messages' }, null);
  }

  // send email
  @Post()
  async sendMail(@Body() sendMailDto: SendMailDto) {
    const res = await firstValueFrom(
      this.messagingService.send({ cmd: 'send-mail' }, sendMailDto),
    );

    return res;
  }

  //send sms
  @Post()
  async sendSms(@Body() sendSmsDto: SendSmsDto) {
    const res = await firstValueFrom(
      this.messagingService.send({ cmd: 'send-sms' }, sendSmsDto),
    );

    return res;
  }

  // send otp
  async sendOtp(@Body() sendOtpDto: SendOtpDto) {
    const res = await firstValueFrom(
      this.messagingService.send({ cmd: 'send-otp' }, sendOtpDto),
    );

    return res;
  }
}
