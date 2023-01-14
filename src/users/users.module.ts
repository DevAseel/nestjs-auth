import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UserValidater } from './middlewares/user-validater.middleware';
import { UsersService } from './services/users/users.service';
import { Users } from '../entities';
import { BcryptService } from './services/bcrypt/bcrypt.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService, BcryptService],
  exports: [UsersService, BcryptService],
})

// for middleware implementation
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserValidater).forRoutes(UsersController);
  }
}
