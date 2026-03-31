import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { ConsumerController } from './inventory.consumer.controller';

@Module({
  controllers: [InventoryController, ConsumerController],
  providers: [InventoryService]
})
export class InventoryModule {}
