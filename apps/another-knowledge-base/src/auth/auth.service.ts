import {
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from '@another-knowledge-base/shared';
import * as argon2 from 'argon2';
import { mapUserToDto } from '@another-knowledge-base/shared';
import { JwtPayload } from '@another-knowledge-base/shared';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(dto: AuthDto) {
    const { email, password } = dto;
    await this.usersService.checkThatUserExistsWithEmail(email);
    const hashed_password = await argon2.hash(password);
    const user = await this.usersService.create({ email, hashed_password });
    return mapUserToDto(user);
  }

  async login(dto: AuthDto) {
    const { email, password } = dto;
    const user = await this.usersService.findOneByEmail(email);
    const isMatch = await argon2.verify(user.hashed_password, password);
    if (!isMatch) {
      throw new UnauthorizedException(`Password is incorrect`);
    }
    const accessToken = await this.generateAccessToken({
      sub: user.id,
      email: user.email,
    });
    return { accessToken };
  }

  async validateToken(token?: string): Promise<JwtPayload> {
    if (!token) {
      throw new UnauthorizedException(`Token is missing`);
    }
    try {
      return await this.jwtService.verifyAsync<JwtPayload>(token);
    } catch (e) {
      Logger.error(e);
      throw new UnauthorizedException(`Token is invalid`);
    }
  }

  private async generateAccessToken(payload: JwtPayload) {
    return this.jwtService.signAsync(payload, {
      expiresIn: +process.env.JWT_EXPIRATION,
    });
  }
}
