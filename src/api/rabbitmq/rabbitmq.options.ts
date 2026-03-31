import { Transport, RmqOptions } from '@nestjs/microservices';

export const rabbitMQConfig = (): RmqOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: [ {
      protocol: 'amqp',
      hostname: 'localhost',
      port: 5672,
      username: 'ubuntu',
      password: '12345678'
    }], 
    queue: 'my_queue', 
    queueOptions: {
      durable: true,
    },
    
  },
});