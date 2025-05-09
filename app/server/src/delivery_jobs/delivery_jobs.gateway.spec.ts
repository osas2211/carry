import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryJobsGateway } from './delivery_jobs.gateway';

describe('DeliveryJobsGateway', () => {
  let gateway: DeliveryJobsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryJobsGateway],
    }).compile();

    gateway = module.get<DeliveryJobsGateway>(DeliveryJobsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
