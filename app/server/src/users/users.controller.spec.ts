import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { PrismaService } from '../prisma.service'
import { UsersService } from './users.service'
import { Role, User } from '@prisma/client'
import { formatUserData } from '../..//helpers/formatUserData'

describe('UsersController', () => {
  let controller: UsersController
  let prisma: PrismaService
  let userAddress: string = `${Math.random() * 234}`

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [PrismaService, UsersService]
    }).compile()

    controller = module.get<UsersController>(UsersController)
    prisma = module.get<PrismaService>(PrismaService)
    // userAddress = `${Math.random() * 234}`
  })

  it("should create user", async () => {
    const user = await controller.createUser({ walletAddress: userAddress, role: Role.NORMAL_USER, avatarUrl: "1234", username: "John" })
    expect({ walletAddress: user.walletAddress, avatar: user.avatarUrl, role: user.role, name: user.username }).toEqual({ walletAddress: userAddress, avatar: "1234", role: "NORMAL_USER", name: "John" })
  })

  it("Should get all couriers", async () => {
    const couriers = await prisma.user.findMany({ where: { role: Role.COURIER } })
    const couriersFromController = await controller.getAllCourier()
    expect(couriersFromController).toEqual({
      couriers: couriers.map((courier) => {
        return formatUserData(courier)
      })
    })
  })

  it("Should get all normal users", async () => {
    const users = await prisma.user.findMany({ where: { role: Role.NORMAL_USER } })
    const usersFromController = await controller.getllNormalUsers()
    expect(usersFromController).toEqual({
      users: users.map((user) => {
        return formatUserData(user)
      })
    })
  })

  it("Should get single User by index", async () => {
    const user = await controller.getUser(userAddress)
    expect(user.walletAddress).toEqual(userAddress)
  })

  it("Should delete user", async () => {
    const response = await controller.deleteUser({ walletAddress: userAddress })
    expect(response).toEqual({ success: true, message: "User deleted successfully" })
  })
})
