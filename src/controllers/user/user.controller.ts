import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Inject,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { Role } from 'src/types';
import { Roles } from 'src/decorators';

@ApiTags('Users')
@Roles(Role.ADMIN)
@Controller('users')
export class UserController {
  constructor(
    @Inject('AUTHENTICATION_SERVICE') private readonly authService: ClientProxy,
  ) {}

  // @ApiTags('Get all users')
  @Get()
  getAllUsers() {
    return this.authService.send({ cmd: 'get-users' }, {});
  }

  // @ApiTags('Get user by id')
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.authService.send({ cmd: 'get-user' }, { id });
  }

  // @ApiTags('Create user')
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.send({ cmd: 'create-user' }, createUserDto);
  }

  // @ApiTags('Update user')
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.send(
      { cmd: 'update-user' },
      { id, ...updateUserDto },
    );
  }

  // @ApiTags('Delete user')
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.authService.send({ cmd: 'delete-user' }, { id });
  }
}
