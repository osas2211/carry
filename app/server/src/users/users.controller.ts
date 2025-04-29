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
  async getAllRiders() {
    return this.usersService.getAllRiders()
  }

  @Get()
  async getllNormalUsers() {
    return this.usersService.getAllNormalUsers()
  }

  @Get()
  async getUser(@Param() address: string) {
    return this.usersService.getUser(address)
  }

  @Delete()
  async deleteUser(@Body() body: { address: string }) {
    return this.usersService.deleteUser(body.address)
  }
}
