import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const { email, hashed_password } = dto;

    const user = await this.usersRepository.save({ email, hashed_password });
    return user;
  }

  async findOneById(id: number): Promise<User> {
    return await this.findOne({ id });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.findOne({ email });
  }

  async checkThatUserExistsWithEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException(`User with email ${email} already exists`);
    }
  }

  async findOne(
    where: FindOptionsWhere<User> | FindOptionsWhere<User>[]
  ): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail(where);
    } catch (e) {
      Logger.error(e);
      throw new NotFoundException(`User not found`);
    }
  }
}
