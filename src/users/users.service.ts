import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    Object.assign(user, createUserDto);
    return this.usersRepository.save(user);
  }

  findAllUser(): Promise<User[]> {
    return this.usersRepository.find();
  }
  viewUser(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }
  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();
    Object.assign(user, { id, updateUserDto });
    return this.usersRepository.save(user);
  }

  removeUser(id: number): Promise<{ affected?: number }> {
    return this.usersRepository.delete(id);
  }

  findSingleBy(username: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        username,
      },
    });
  }
}
