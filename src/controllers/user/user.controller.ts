import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Inject,
  Query,
  Patch,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserQueryDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { Role } from 'src/types';
import { Roles } from 'src/decorators';
import { msResponseFormatter } from 'src/helpers';

@ApiTags('Users')
@Roles(Role.ADMIN)
@Controller('user')
export class UserController {
  constructor(
    @Inject('AUTHENTICATION_SERVICE') private readonly authService: ClientProxy,
  ) {}

  // @ApiTags('Get all users')
  @Get()
  async getAllUsers(@Query() query: UserQueryDto) {
    console.log(query);
    return await msResponseFormatter(
      this.authService.send({ cmd: 'find-all-users' }, query),
    );
  }

  @Get('trashed')
  async getTrashedUsers(@Query() query: UserQueryDto) {
    return await msResponseFormatter(
      this.authService.send({ cmd: 'find-trashed-users' }, query),
    );
  }

  // @ApiTags('Get user by id')
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await msResponseFormatter(
      this.authService.send({ cmd: 'find-one-user' }, { id }),
    );
  }

  // @ApiTags('Create user')
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await msResponseFormatter(
      this.authService.send({ cmd: 'create-user' }, createUserDto),
    );
  }

  @Patch('restore/:id')
  async restoreUser(@Param('id') id: string) {
    return await msResponseFormatter(
      this.authService.send({ cmd: 'restore-user' }, { id }),
    );
  }

  @Patch('activate/:id')
  async activateUser(@Param('id') id: string) {
    return await msResponseFormatter(
      this.authService.send({ cmd: 'activate-user' }, { id }),
    );
  }

  @Patch('deactivate/:id')
  async deactivateUser(@Param('id') id: string) {
    return await msResponseFormatter(
      this.authService.send({ cmd: 'deactivate-user' }, { id }),
    );
  }

  // @ApiTags('Update user')
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await msResponseFormatter(
      this.authService.send({ cmd: 'update-user' }, { id, ...updateUserDto }),
    );
  }

  // @ApiTags('Delete user')
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await msResponseFormatter(
      this.authService.send({ cmd: 'delete-user' }, { id }),
    );
  }
}
