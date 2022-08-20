import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, SignInDto, UpdateUserDto } from './dtos';
import { PrismaService } from '../prisma/prisma.service';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const candidate = await this.prismaService.user.findFirst({
      where: {
        OR: [
          { username: createUserDto.username },
          { email: createUserDto.email },
        ],
      },
    });
    if (candidate) {
      throw new BadRequestException(
        'User already exists with email or username',
      );
    }
    const newUser = await this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        username: createUserDto.username,
        password: await hash(createUserDto.password, 8),
      },
    });
    delete newUser.password;
    return {
      ...newUser,
      accessToken: await this.generateToken(newUser.id, newUser.email),
    };
  }

  async signin(signInDto: SignInDto) {
    const candidate = await this.prismaService.user.findFirst({
      where: {
        OR: [{ username: signInDto.username }, { email: signInDto.email }],
      },
    });
    if (!candidate) {
      throw new BadRequestException('User not found');
    }
    const isPasswordMatch = await compare(
      signInDto.password,
      candidate.password,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid credentials');
    }
    delete candidate.password;
    return {
      ...candidate,
      accessToken: await this.generateToken(candidate.id, candidate.email),
    };
  }

  async updateUser(updateUserDto: UpdateUserDto, id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      throw new BadRequestException('Something went wrong');
    }
    if (updateUserDto.password) {
      const passportIsMatch = await compare(
        updateUserDto.passwordConfirm,
        user.password,
      );
      if (!passportIsMatch) {
        throw new BadRequestException('Invalid credentials');
      }
    }
    const filteredUserDto = updateUserDto.password
      ? {
          ...this.filterUserDto(updateUserDto),
          password: await hash(updateUserDto.password, 8),
        }
      : this.filterUserDto(updateUserDto);
    updateUserDto.password && delete filteredUserDto.passwordConfirm;
    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: filteredUserDto,
    });
    delete updatedUser.password;
    return updatedUser;
  }

  filterUserDto(userDto: UpdateUserDto) {
    return Object.entries(userDto).reduce<UpdateUserDto>(
      (acc, [key, value]) => {
        if (value) {
          acc[key] = value;
        }
        return acc;
      },
      {} as UpdateUserDto,
    );
  }

  async generateToken(userId: number, email: string) {
    const accessToken = await this.jwtService.signAsync(
      { sub: userId, email },
      {
        expiresIn: '1d',
        secret: this.configService.get<string>('JWT_SECRET'),
      },
    );
    return accessToken;
  }
}
