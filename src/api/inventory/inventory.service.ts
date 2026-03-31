import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Inventory } from 'src/database/entities/inventory.entity';
import { ProductVariation } from 'src/database/entities/productVariation.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) { }

  public async create(createInventoryDto: CreateInventoryDto) {
    const inventoryEntry = this.entityManager.create(Inventory, {
      ...createInventoryDto,
    });


    return this.entityManager.save(inventoryEntry);
  }

  async findAll() {
    const res = await this.entityManager.find(Inventory, {
      where: {

      }
    });
    return res;
  }

  public async findOne(id: number) {
    const inventoryEntry = await this.entityManager.findOne(Inventory, {
      where: {
        id,
      },
    });

    if (!inventoryEntry) throw new NotFoundException("INVENTORY ENTRY NOT FOUND");

    return inventoryEntry;
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return `This action updates a #${id} inventory`;
  }

  public async remove(id: number) {
    const productVariation = await this.entityManager.findOne(ProductVariation, {
      where: {
        productId: id,
      }
    });

    if (!productVariation) throw new Error('Missing product variation.');

    const inventoryEntry = await this.entityManager.findOne(Inventory, {
      where: {
        productVariationId: productVariation.id,
      }
    });

    if(!inventoryEntry) throw new Error("'Missing invetory entry");

    const result = await this.entityManager.delete(Inventory, inventoryEntry.id);
    console.info('DELETION RESULT', result);

    return result;
  }
}
