import { RtStrategy, AtStrategy } from './strategies';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities';
import { AuthController } from './controlllers/auth/auth.controller';
import { AuthService } from './services/';
import { UsersService, BcryptService } from 'src/users/services';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), JwtModule.register({}), UsersModule],
  controllers: [AuthController],
  providers: [UsersService, BcryptService, AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {}
