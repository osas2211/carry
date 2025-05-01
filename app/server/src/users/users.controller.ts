import { Body, Controller, Delete, Get, HttpCode, Param, Post, Req } from '@nestjs/common'
import { UsersService } from './users.service'
import { Request } from 'express'
import { CreateUserDTO } from './users.type'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Post()
  @HttpCode(201)
  async createUser(@Body() body: CreateUserDTO) {
    return this.usersService.createUser(body)
  }

  @Get("/riders")
  async getAllCourier() {
    return this.usersService.getAllCourier()
  }

  @Get()
  async getllNormalUsers() {
    return this.usersService.getAllNormalUsers()
  }

  @Get("/:walletAddress")
  async getUser(@Param("walletAddress") walletAddress: string) {
    return this.usersService.getUser(walletAddress)
  }

  @Delete()
  async deleteUser(@Body() body: { walletAddress: string }) {
    return this.usersService.deleteUser(body.walletAddress)
  }
}
