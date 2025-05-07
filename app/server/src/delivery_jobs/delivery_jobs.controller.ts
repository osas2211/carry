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

  @Get()
  async getAllJobs(@Query("walletAddress") walletAddress?: string, @Query("walletAddress") courierAddress?: string) {
    return this.jobService.getAllDeliveryJobs(walletAddress, courierAddress)
  }

  @Get(":id")
  async getJob(@Param("id") id: string) {
    return this.jobService.getDeliveryJob(id)
  }

  @Patch(":id")
  async acceptDelivery(@Param("id") id: string, @Body() courierAddress: string) {
    return this.jobService.acceptDeliveryJob(id, courierAddress)
  }

  @Patch(":id")
  async confirmDelivery(@Param("id") id: string) {
    return this.jobService.confirmDelivery(id)
  }

  @Patch(":id")
  async cancelDelivery(@Param("id") id: string) {
    return this.jobService.cancelDelivery(id)
  }

}
