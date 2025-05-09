import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Job, JobStatus } from '@prisma/client'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({ cors: true })
export class DeliveryJobsGateway {
  @WebSocketServer()
  server: Server

  handleConnection(client: Socket): void {
    this.server.emit('room', client.id + ' joined!')
  }

  @SubscribeMessage('events')
  handleJobStatus(@MessageBody() data: { shipment_id: string, status: JobStatus }) {
    console.log(data)
    this.server.emit(`shipment-status-${data?.shipment_id}`, data)
  }

  @SubscribeMessage('events')
  handleAssignCourier(@MessageBody() data: { courierAddress: string, shipment: Job }) {
    console.log(data)
    this.server.emit(`courier-${data?.courierAddress}`, data)
  }


}
