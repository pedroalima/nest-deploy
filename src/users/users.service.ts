import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.users.create({
      data: {
        ...createUserDto,
        id: createUserDto.id?.toString(),
      },
    });
    return {
      ...user,
      password: undefined,
    };
  }

  async findAll() {
    const users = await this.prisma.users.findMany();
    return users;
  }

  async findOne(id: string) {
    const user = this.prisma.users.findUnique({
      where: { id: id },
    });

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const { id: _, ...data } = updateUserDto;
    return this.prisma.users.update({
      where: { id: id },
      data: { ...data },
    });
  }

  remove(id: string) {
    return this.prisma.users.delete({
      where: { id: id },
    });
  }
}
