import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return { speedFi: 'Welcome to speedFi' };
  }
}
