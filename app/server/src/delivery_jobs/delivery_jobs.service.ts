import { BadRequestException, Body, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common'
import { PrismaService, } from '../prisma.service'
import { CreateDeliveryJobDto } from './jobs.dto'
import { DeliveryJobsGateway } from './delivery_jobs.gateway'

@Injectable()
export class DeliveryJobsService {
  constructor(private readonly prisma: PrismaService, private readonly events: DeliveryJobsGateway) { }

  async createDeliveryJob(body: CreateDeliveryJobDto, publicKey: string) {
    const req_fields = [
      'reward',
      'pickupAddress',
      'dropoffAddress',
    ]
    req_fields.forEach((field) => {
      if (!body[field as "reward"]) {
        throw new BadRequestException({ message: `${field} is required.`, success: false })
      }
    })

    const deliveryJob = await this.prisma.job.create({ data: { ...body, creatorAddress: publicKey, } })
    return { message: "Delivery job created successfully", deliveryJob, success: true }

  }

  async getUserDeliveryJobs(walletAddress: string) {
    const user = await this.prisma.user.findUnique({ where: { walletAddress } })
    const user_role = user?.role
    const jobs = await this.prisma.job.findMany({ where: user_role === "NORMAL_USER" ? { creatorAddress: walletAddress } : { courierAddress: walletAddress }, orderBy: { createdAt: "desc" } })
    return { data: jobs }
  }

  async getAllDeliveryJobs(walletAddress?: string) {
    const jobs = await this.prisma.job.findMany()
    return { data: jobs }
  }

  async getDeliveryJob(id: string) {
    const job = await this.prisma.job.findUnique({ where: { id }, include: { creator: true, courier: true }, })
    if (!job) {
      throw new NotFoundException("Delivery Job not found")
    }
    return { data: job }
  }

  async assignToCourier(id: string, courierAddress: string) {
    const courier = await this.prisma.user.findUnique({ where: { walletAddress: courierAddress } })
    if (courier?.isBusy === true) {
      throw new NotAcceptableException("Courier can not go on multiple jobs")
    }
    const job = await this.prisma.job.findUnique({ where: { id } })
    if (!job) {
      throw new NotFoundException("Delivery Job not found")
    }
    if (job?.status !== "ACTIVE" && job?.status !== "CANCELLED") {
      throw new NotAcceptableException("Delivery job is already taken or not available to be taken.")
    }
    const updatedJob = await this.prisma.job.update({ where: { id }, data: { courierAddress }, include: { courier: true, creator: true } })
    return { data: updatedJob, success: true, message: "Delivery job successfully accepted" }
  }

  async acceptDeliveryJob(id: string, courierAddress: string) {
    const courier = await this.prisma.user.findUnique({ where: { walletAddress: courierAddress } })
    // if (courier?.isBusy === true) {
    //   throw new NotAcceptableException({ message: "Courier can not go on multiple jobs" })
    // }
    const job = await this.prisma.job.findUnique({ where: { id } })
    if (!job) {
      throw new NotFoundException("Delivery Job not found")
    }
    if (job?.status !== "ACTIVE" && job?.status !== "CANCELLED") {
      throw new NotAcceptableException("Delivery job is already taken or not available to be taken.")
    }
    const updatedJob = await this.prisma.job.update({ where: { id }, data: { status: "IN_PROGRESS", courierAddress }, include: { courier: true, creator: true } })
    await this.prisma.user.update({ where: { walletAddress: courierAddress }, data: { isBusy: true } })
    this.events.handleJobStatus({ shipment_id: updatedJob.id, status: updatedJob.status })
    return { data: updatedJob, success: true, message: "Delivery job successfully accepted" }
  }

  async confirmDelivery(id: string) {
    const job = await this.prisma.job.findUnique({ where: { id } })
    if (!job?.courierAddress) {
      throw new BadRequestException("No courier assigned to this delivery job")
    }
    if (!job) {
      throw new NotFoundException("Delivery Job not found")
    }
    if (job?.status !== "IN_PROGRESS") {
      throw new NotAcceptableException("Delivery job not slated for delivery.")
    }
    const updatedJob = await this.prisma.job.update({ where: { id }, data: { status: "DELIVERED" }, include: { courier: true, creator: true } })
    await this.prisma.user.update({ where: { walletAddress: job.courierAddress }, data: { isBusy: false } })
    return { data: updatedJob, success: true, message: "Package has been successfully delivered" }
  }

  async cancelDelivery(id: string) {
    const job = await this.prisma.job.findUnique({ where: { id } })
    if (!job) {
      throw new NotFoundException("Delivery Job not found")
    }
    if (job?.status !== "ACTIVE") {
      throw new NotAcceptableException("Delivery job cannot be cancelled at this point.")
    }
    const updatedJob = await this.prisma.job.update({ where: { id }, data: { status: "CANCELLED", }, include: { creator: true } })
    return { data: updatedJob, success: true, message: "Delivery job successfully cancelled" }

  }
}
