import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    const user = new this.prisma.users(createUserDto);
    return {
      ...user,
      password: undefined,
    };
  }

  findAll() {
    return this.prisma.users.find();
  }

  findOne(id: string) {
    return this.prisma.users.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.users.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.prisma.users
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
