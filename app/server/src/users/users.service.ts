import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDTO, UserRole } from './users.type'
import { PrismaService } from '../prisma.service'
import { Prisma, User } from '@prisma/client'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }
  async createUser(body: CreateUserDTO): Promise<User> {
    const { create } = this.prisma.user
    const user = await create({
      data: { id: body.address, avatar: body.avatar, role: body.role, name: body.name }
    })
    return user
  }

  async getAllRiders(): Promise<User[]> {
    const riders = await this.prisma.user.findMany({ where: { role: UserRole.RIDER } })
    return riders
  }

  async getUser(index: number) {
    const user = await this.prisma.user.findUnique({ where: { index } })
    if (user) {
      return user
    } else {
      throw new NotFoundException({ message: "User not found" })
    }
  }
}
