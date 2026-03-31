import { Controller } from '@nestjs/common';
import { ProductVariationService } from './product-variation.service';
import { EventPattern } from '@nestjs/microservices';
import { Color } from 'src/database/entities/color.entity';

@Controller()
export class ProductVariationController {
  constructor(private readonly productVariationService: ProductVariationService) {}

  @EventPattern('PRODUCT_CREATED')
    async handleMessage(data: Record<string, any>) {
      console.info('RABBITMQ - PRODUCT_CREATED - Consumer');
      console.log('Received message:', data.id);
      
      this.productVariationService.create({
        productId: data.id,
        sizeCode: 'L',
        color: 'red',
        imageUrls: [],
        createdAt: data?.createdAt,
        updatedAt: data?.updatedAt,
      })
    }
  
}
