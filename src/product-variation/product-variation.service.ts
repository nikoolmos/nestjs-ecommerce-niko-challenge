import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ProductVariation } from 'src/database/entities/productVariation.entity';
import { EntityManager } from 'typeorm';
import ProductVariationDto from './product-variation-dto';
import { ProducerService } from 'src/api/rabbitmq/producer.service';

@Injectable()
export class ProductVariationService {

    constructor(@InjectEntityManager() private readonly entityManager: EntityManager, private readonly producerService: ProducerService,) {

    }

    public async create(body: ProductVariationDto) {
        const productVariation = this.entityManager.create(ProductVariation, {
            productId: body.productId,
            sizeCode: body.sizeCode,
            colorName: body.color,
            createdAt: body.createdAt,
            updatedAt: body.updatedAt,
            imageUrls: body.imageUrls,
        });


        const result = await this.entityManager.save(productVariation);

        this.producerService.sendMessage('PRODUCT_VARIATION_CREATE', result);
    }
}
