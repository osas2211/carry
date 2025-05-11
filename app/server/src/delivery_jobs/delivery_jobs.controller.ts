import { Body, Controller, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common'
import { DeliveryJobsService } from './delivery_jobs.service'
import { CreateDeliveryJobDto } from './jobs.dto'
import { WalletAuthMiddleware } from '@server/middleware/wallet-auth'

@Controller('jobs')
export class DeliveryJobsController {
  constructor(private readonly jobService: DeliveryJobsService) { }

  @UseGuards(WalletAuthMiddleware)
  @Post()
  async createDeliveryJob(@Body() body: CreateDeliveryJobDto, @Request() req: { publicKey: string }) {
    return this.jobService.createDeliveryJob(body, req.publicKey)
  }

  @UseGuards(WalletAuthMiddleware)
  @Get("/user-shipments")
  async getUserDeliveryJobs(@Request() req: { publicKey: string }) {
    return this.jobService.getUserDeliveryJobs(req.publicKey)
  }

  @Get()
  async getAllJobs(@Query("walletAddress") walletAddress?: string, @Query("walletAddress") courierAddress?: string) {
    return this.jobService.getAllDeliveryJobs(walletAddress)
  }

  @Get(":id")
  async getJob(@Param("id") id: string) {
    return this.jobService.getDeliveryJob(id)
  }

  @UseGuards(WalletAuthMiddleware)
  @Patch(":id/accept")
  async acceptDelivery(@Param("id") id: string, @Request() req: { publicKey: string }) {
    return this.jobService.acceptDeliveryJob(id, req.publicKey)
  }

  @UseGuards(WalletAuthMiddleware)
  @Patch(":id/assign")
  async assignToCourier(@Param("id") id: string, @Body() body: { courierAddress: string }) {
    return this.jobService.assignToCourier(id, body.courierAddress)
  }

  @UseGuards(WalletAuthMiddleware)
  @Patch(":id/pickup")
  async pickup_package(@Param("id") id: string) {
    return this.jobService.pickup_package(id)
  }

  @UseGuards(WalletAuthMiddleware)
  @Patch(":id/confirm")
  async confirmDelivery(@Param("id") id: string) {
    return this.jobService.confirmDelivery(id)
  }

  @UseGuards(WalletAuthMiddleware)
  @Patch(":id/cancel")
  async cancelDelivery(@Param("id") id: string) {
    return this.jobService.cancelDelivery(id)
  }

}
