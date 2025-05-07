import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersController } from './users/users.controller'
import { UsersService } from './users/users.service'
import { PrismaService } from './prisma.service'
import { DeliveryJobsController } from './delivery_jobs/delivery_jobs.controller'
import { DeliveryJobsService } from './delivery_jobs/delivery_jobs.service'
import { WalletAuthMiddleware } from './middleware/wallet-auth'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'



@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      // signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController, UsersController, DeliveryJobsController,],
  providers: [AppService, UsersService, PrismaService, DeliveryJobsService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(WalletAuthMiddleware)
      .forRoutes('users/profile', "jobs") // Apply it to specific routes
  }
}
