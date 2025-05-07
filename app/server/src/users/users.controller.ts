import { Body, Controller, Delete, Get, Header, Headers, HttpCode, Param, Post, Req, Request, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDTO } from './users.type'
import { WalletAuthMiddleware } from '@server/middleware/wallet-auth'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Post()
  @HttpCode(201)
  async createUser(@Body() body: CreateUserDTO) {
    return this.usersService.createUser(body)
  }

  @Post("/generate-server-token")
  async generateServerToken(@Body() body: { pubKey: string }) {
    return this.usersService.generateServerToken(body.pubKey)
  }

  @Get("/riders")
  async getAllCourier() {
    return this.usersService.getAllCourier()
  }


  @Get()
  async getllNormalUsers() {
    return this.usersService.getAllNormalUsers()
  }

  @UseGuards(WalletAuthMiddleware)
  @Get("/profile")
  async getUserProfile(@Request() req: { publicKey: string }) {
    return this.usersService.getUserProfile(req.publicKey)
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
