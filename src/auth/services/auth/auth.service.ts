import { Injectable, Inject, HttpException, HttpStatus, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../../entities';
import { AuthDto } from 'src/auth/dto';
import { UsersService, BcryptService } from 'src/users/services';
import { JwtService } from '@nestjs/jwt';
import { jwtTokenTtl, jwtSecret, jwtRefreshSecert, jwtRefreshTokenTtl } from '../../../config';
import { Token } from '../../types';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @Inject(UsersService)
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(BcryptService) private bcryptService: BcryptService,
  ) {}

  async signupLocal(dto: AuthDto): Promise<Token> {
    const user = await this.usersService.findOneByEmail(dto.email);
    if (user) throw new HttpException('User Already Exists', HttpStatus.BAD_REQUEST);
    dto.password = await this.bcryptService.hashValue(dto.password);
    const newUser = await this.usersService.save(dto);
    const tokens = await this.generateToken(newUser.id, newUser.email);
    newUser.rtHash = await this.bcryptService.hashValue(tokens.refreshToken);
    await this.usersService.save(newUser);
    return tokens;
  }

  async signinLocal(dto: AuthDto) {
    const user = await this.usersService.findOneByEmail(dto.email);
    if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    const verify = await this.bcryptService.verify(dto.password, user.password);
    if (!verify) throw new ForbiddenException('Access Denied');
    const tokens = await this.generateToken(user.id, user.email);
    user.rtHash = await this.bcryptService.hashValue(tokens.refreshToken);
    await this.usersService.save(user);
    return tokens;
  }

  async logout(userId: string) {
    const user = await this.usersService.findOne(userId);
    user.rtHash = null;
    await this.usersService.save(user);
  }

  async refreshToken(userId: string, rt: string) {
    const user = await this.usersService.findOne(userId);
    if (!user || !user.rtHash) throw new ForbiddenException('Access Denied');
    const verify = await this.bcryptService.verify(rt, user.rtHash);
    if (!verify) throw new ForbiddenException('Access Denied');
    const tokens = await this.generateToken(user.id, user.email);
    user.rtHash = await this.bcryptService.hashValue(tokens.refreshToken);
    await this.usersService.save(user);
    return tokens;
  }

  async generateToken(userId: string, email: string): Promise<Token> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync({ sub: userId, email: email }, { secret: jwtSecret, expiresIn: jwtTokenTtl }),
      this.jwtService.signAsync(
        { sub: userId, email: email },
        { secret: jwtRefreshSecert, expiresIn: jwtRefreshTokenTtl },
      ),
    ]);

    return { accessToken: at, refreshToken: rt };
  }
}
