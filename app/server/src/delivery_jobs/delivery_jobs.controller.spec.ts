import { Test, TestingModule } from '@nestjs/testing'
import { DeliveryJobsController } from './delivery_jobs.controller'
import { PrismaService } from '../prisma.service'
import { DeliveryJobsService } from './delivery_jobs.service'
import { CreateDeliveryJobDto } from './jobs.dto'

describe('DeliveryJobsController', () => {
  let controller: DeliveryJobsController
  let jobId: string
  let courierAddress = "AptZYQxgnnpD9RzjYYhiAQecCBYtZdAwesvNmW1hk8eC"
  const createData: CreateDeliveryJobDto = {
    creatorAddress: "AR3rmJEVfRfYtBkUYzxjKSHWPDiEuB56GTSZezBFHAWc",
    reward: 1,
    pickupAddress: "56 Ademuyiwa street",
    dropoffAddress: "7 yaba road",
    eta: new Date().toISOString(),
    metadataHash: "",
    description: "Good product"
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryJobsController],
      providers: [PrismaService, DeliveryJobsService]
    }).compile()

    controller = module.get<DeliveryJobsController>(DeliveryJobsController)
  })

  it("it should create a delivery job", async () => {
    const job = await controller.createDeliveryJob(createData)
    jobId = job.deliveryJob.id
    expect(job.deliveryJob.creatorAddress).toBe(createData.creatorAddress)
  })

  it("It should return all jobs", async () => {
    const jobs = await controller.getAllJobs()
    expect(jobs.data).toBeDefined()
  })

  it("It should get single delivery job", async () => {
    const job = await controller.getJob(jobId)
    expect(job.data.id).toBe(jobId)
  })
  it("It should accept a delivery job", async () => {
    const job = await controller.acceptDelivery(jobId, courierAddress)
    expect(job.data.status).toBe("IN_PROGRESS")
  })
  it("It should confirm a delivery job", async () => {
    const job = await controller.confirmDelivery(jobId)
    expect(job.data.status).toBe("DELIVERED")
  })
  // it("It should cancel a delivery job", async () => {
  //   const job = await controller.cancelDelivery(jobId)
  //   expect(job.data.status).toBe("CANCELLED")
  // })
})
