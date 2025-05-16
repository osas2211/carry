import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './users.type';
import { PrismaService } from '../prisma.service';
import { User, Role } from '@prisma/client';
import { formatUserData } from '../../helpers/formatUserData';
import { JwtService } from '@nestjs/jwt';
// import { verifySignature } from '@server/utils/verify';
// import { CREATE_ACCOUNT_MESSAGE } from '@server/utils/constants';

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return Number(this);
};

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async createUser(body: CreateUserDTO) {
    console.log(body);
    const bodyKeys = ['walletAddress', 'username', 'role'];
    bodyKeys.forEach((key) => {
      if (body[key as 'walletAddress'] === undefined) {
        console.log('bad request');
        throw new BadRequestException(`${key} is required`);
      }
    });
    // const message = JSON.stringify(CREATE_ACCOUNT_MESSAGE);

    // const verified = verifySignature({
    //   pubkey: body.walletAddress,
    //   message,
    //   signature: body.signedMessage,
    // });

    // if (!verified) {
    //   throw new BadRequestException('Invalid signature');
    // }

    const { create, findUnique } = this.prisma.user;

    const userExists = await findUnique({
      where: { walletAddress: body.walletAddress },
    });

    if (userExists) {
      console.log('address exist');
      throw new BadRequestException('User already exists');
    }
    const user = await create({
      data: { ...body, role: body.role as Role },
    });
    return formatUserData(user);
  }

  async generateServerToken(pubKey: string) {
    const payload = { pubKey };
    const token = await this.jwt.signAsync(JSON.stringify(payload));
    return { token };
  }

  async getAllCourier(): Promise<{ couriers: User[] }> {
    const couriers = await this.prisma.user.findMany({
      where: { role: Role.COURIER },
    });
    return {
      couriers: couriers.map((user) => {
        return formatUserData(user);
      }),
    };
  }

  async getAllNormalUsers(): Promise<{ users: User[] }> {
    const users = await this.prisma.user.findMany({
      where: { role: Role.NORMAL_USER },
    });
    return {
      users: users.map((user) => {
        return formatUserData(user);
      }),
    };
  }

  async getUser(walletAddress: string) {
    const user = await this.prisma.user.findUnique({
      where: { walletAddress: walletAddress },
    });
    if (user) {
      return formatUserData(user);
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async getUserProfile(walletAddress: string) {
    const user = await this.prisma.user.findUnique({
      where: { walletAddress: walletAddress },
    });
    if (user) {
      return formatUserData(user);
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async deleteUser(walletAddress: string) {
    const user = await this.prisma.user.findUnique({
      where: { walletAddress: walletAddress },
    });
    if (user) {
      await this.prisma.user.delete({
        where: { walletAddress: walletAddress },
      });
      return { success: true, message: 'User deleted successfully' };
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
