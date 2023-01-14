import { UserNotFoundException, CreateUserException } from './../../exceptions';
import { SerializedUser } from './../../interfaces';
import { Controller, Get, Post, Param, Body, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { Inject, UseInterceptors, ClassSerializerInterceptor, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../../filters';
import { UsersService, BcryptService } from 'src/users/services';
import { CreateUserDto } from 'src/users/dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(BcryptService) private readonly bcryptService: BcryptService,
  ) {}

  @Get('')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(HttpExceptionFilter)
  async getUsers() {
    const users = await this.usersService.findAll();
    if (!users) {
      throw new UserNotFoundException('Users not found');
    }
    const serializedUsers = users.map((user) => new SerializedUser(user));
    return serializedUsers;
  }

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseFilters(HttpExceptionFilter)
  async getUserById(@Param('id', ParseIntPipe) id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    const serializedUser = new SerializedUser(user);
    return serializedUser;
  }

  @Post('sign-up')
  @UsePipes(ValidationPipe)
  async createUser(@Body() user: CreateUserDto) {
    user.password = await this.bcryptService.hashValue(user.password);
    const users = this.usersService.save(user);
    if (!users) {
      throw new CreateUserException();
    }
    return users;
  }
}
