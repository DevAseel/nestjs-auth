import { AtGuard, RtGuard } from '../../../common/guards';
import { getCurrentUser, getCurrentUserId, Public } from '../../../common/decorators';
import { AuthService } from '../../services';
import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { Inject, HttpCode, HttpStatus, UseGuards, Res } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto';
import { Token } from '../../types';
import { Response } from 'express';
import { cookieConfig } from 'src/config';
import { IAuthController } from 'src/auth/interfaces';

@Controller('auth')
export class AuthController implements IAuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('local/signup')
  @Public()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response): Promise<Token> {
    const tokens = await this.authService.signupLocal(dto);
    res.cookie('_auth_at', tokens.accessToken, cookieConfig);
    res.cookie('_auth_rt', tokens.refreshToken, cookieConfig);
    return tokens;
  }

  @Post('local/signin')
  @Public()
  @HttpCode(HttpStatus.OK)
  async signinLocal(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response): Promise<Token> {
    const tokens = await this.authService.signinLocal(dto);
    res.cookie('_auth_at', tokens.accessToken, cookieConfig);
    res.cookie('_auth_rt', tokens.refreshToken, cookieConfig);
    return tokens;
  }

  @Post('logout')
  @UseGuards(AtGuard)
  @HttpCode(HttpStatus.OK)
  logout(@getCurrentUserId() userId: string, @Res({ passthrough: true }) res: Response): Promise<void> {
    res.clearCookie('_auth_at');
    res.clearCookie('_auth_rt');
    return this.authService.logout(userId);
  }

  @Post('refresh')
  @Public()
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  refresh(@getCurrentUserId() userId: string, @getCurrentUser('refreshToken') refreshToken: string): Promise<Token> {
    return this.authService.refreshToken(userId, refreshToken);
  }
}
