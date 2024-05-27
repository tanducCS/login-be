import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser({ username, password }: AuthPayloadDto) {
    const findUser = await this.usersService.findSingleBy(username);
    if (!findUser) return null;
    if (password !== findUser.password) {
      return null;
    }
    const { password: pass, ...user } = findUser;
    return {
      ...user,
      access_token: this.jwtService.sign(user),
      refresh_token: this.jwtService.sign(user, { expiresIn: '7d' }),
    };
  }
}
