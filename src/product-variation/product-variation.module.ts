import { Module } from '@nestjs/common';
import { ProductVariationService } from './product-variation.service';
import { ProductVariationController } from './product-variation.controller';
import { RabbitMQModule } from 'src/api/rabbitmq/rabbitmq.module';

@Module({
  imports: [ RabbitMQModule],
  controllers: [ProductVariationController],
  providers: [ProductVariationService]
})
export class ProductVariationModule {}
