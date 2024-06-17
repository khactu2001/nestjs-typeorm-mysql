import { Body, Get, Injectable, Post, Put } from '@nestjs/common';
import { CreateNormalUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { UpdateNormalUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(normalUserDto: CreateNormalUserDto[]) {
    // const userCreated = this.userRepository.create(normalUserDto);
    // return this.userRepository.save(userCreated);
    return this.userRepository.insert(normalUserDto);
    // return await this.userRepository.save(usersCreated.);
  }

  getUsers() {
    const users = this.userRepository.find({
      relations: {
        medicines: true,
      },
    });
    return users;
  }

  updateNormalUser(id: number, body: UpdateNormalUserDto) {
    this.userRepository.update(
      { id },
      {
        ...body,
      },
    );
  }

  getUserById(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  deleteUserById(id: number) {
    return this.userRepository.delete({ id });
  }
}
