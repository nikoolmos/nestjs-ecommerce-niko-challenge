import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InventoryService } from './inventory.service';
import { ProductVariation } from 'src/database/entities/productVariation.entity';

@Controller()
export class ConsumerController {
  constructor(private readonly inventoryService: InventoryService) {}

  @EventPattern('PRODUCT_VARIATION_CREATE')
  async handleMessage(data: ProductVariation) {
    console.info('RABBITMQ - PRODUCT_VARIATION_CREATE - Consumer');
    console.log('Received message:', data);
    
    this.inventoryService.create({
      productVariationId: data.id,
      countryCode: 'EG',
      quantity: 10,
      createdAt: data?.createdAt.toString(),
      updatedAt: data?.updatedAt.toString(),
    })
  }


  @EventPattern('PRODUCT_DELETED')
  async handleDeleteProduct(data: Record<string, any>) {
    console.info('RABBITMQ - PRODUCT_DELETED - Consumer');
    
    this.inventoryService.remove(data.id);
  }
}