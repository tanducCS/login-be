import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  username: string;

  @IsString()
  @IsEnum(['f', 'm', 'u'])
  gender: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Password must have atleast 6 characters.' })
  password: string;
}
