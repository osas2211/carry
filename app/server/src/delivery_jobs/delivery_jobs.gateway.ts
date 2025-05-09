import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { JobStatus } from '@prisma/client'
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


}
