import { Body, Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common'
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
  async getUser(@Param() index: number) {
    return this.usersService.getUser(index)
  }
}
