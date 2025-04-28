import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { PrismaService } from '../prisma.service'
import { UserRole } from './users.type'
import { UsersService } from './users.service'

describe('UsersController', () => {
  let controller: UsersController
  let prisma: PrismaService
  let userAddress: string

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [PrismaService, UsersService]
    }).compile()

    controller = module.get<UsersController>(UsersController)
    prisma = module.get<PrismaService>(PrismaService)
    userAddress = `${Math.random() * 234}`
  })

  it("should create user", async () => {
    const users_count = await prisma.user.findMany()
    const user = await controller.createUser({ address: userAddress, role: UserRole.RIDER, avatar: "1234", name: "John" })
    expect(user).toEqual({ id: userAddress, avatar: "1234", role: "RIDER", index: users_count.length + 1, name: "John" })
  })

  it("Should get all riders", async () => {
    const riders = await prisma.user.findMany({ where: { role: UserRole.RIDER } })
    const ridersFromController = await controller.getAllRiders()
    expect(ridersFromController).toEqual(riders)
  })

  it("Should get single User by index", async () => {
    const user = await controller.getUser(1)
    expect(user.index).toBe(1)
  })
})
