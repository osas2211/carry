import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDTO } from './users.type'
import { PrismaService } from '../prisma.service'
import { User, Role } from '@prisma/client'
import { formatUserData } from '../../helpers/formatUserData'

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return Number(this)
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }
  async createUser(body: CreateUserDTO) {
    const bodyKeys = ["walletAddress", "username", "role"]
    bodyKeys.forEach((key) => {
      if (body[key as "walletAddress"] === undefined) {
        throw new BadRequestException(`${key} is required`)
      }
    })
    const { create, findUnique } = this.prisma.user
    const userExists = await findUnique({ where: { walletAddress: body.walletAddress } })
    if (userExists) {
      throw new BadRequestException("User already exists")
    }
    const user = await create({
      data: { ...body, role: body.role as Role }
    })
    return formatUserData(user)
  }

  async getAllCourier(): Promise<{ couriers: User[] }> {
    const couriers = await this.prisma.user.findMany({ where: { role: Role.COURIER } })
    return {
      couriers: couriers.map((user) => {
        return formatUserData(user)
      })
    }
  }

  async getAllNormalUsers(): Promise<{ users: User[] }> {
    const users = await this.prisma.user.findMany({ where: { role: Role.NORMAL_USER } })
    return {
      users: users.map((user) => {
        return formatUserData(user)
      })
    }
  }

  async getUser(walletAddress: string) {
    const user = await this.prisma.user.findUnique({ where: { walletAddress: walletAddress } })
    if (user) {
      return user
    } else {
      throw new NotFoundException("User not found")
    }
  }

  async deleteUser(walletAddress: string) {
    const user = await this.prisma.user.findUnique({ where: { walletAddress: walletAddress } })
    if (user) {
      await this.prisma.user.delete({ where: { walletAddress: walletAddress } })
      return { success: true, message: "User deleted successfully" }
    } else {
      throw new NotFoundException("User not found")
    }
  }
}
