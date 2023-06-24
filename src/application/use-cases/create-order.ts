import { Injectable } from '@nestjs/common';

import { Order } from '@Domain/enterprise/entities/order';
import { ResourceNotFound } from '@Application/errors/resource-not-found';
import { AssetsRepository } from '@Application/repositories/assets-repository';
import { OrdersRepository } from '@Application/repositories/orders-repository';

interface CreateOrderUseCaseRequest {
  assetId: string;
  price: number;
}

interface CreateOrderUseCaseResponse {
  order: Order;
}

@Injectable()
export class CreateOrderUseCase {
  public constructor(
    private readonly assetsRepository: AssetsRepository,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  public async execute({
    assetId,
    price,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const asset = await this.assetsRepository.findByIdentifier(assetId);

    if (!asset) {
      throw new ResourceNotFound(`Asset ${assetId} not found.`);
    }

    const order = Order.create({
      asset,
      assetId: assetId,
      price,
    });

    await this.ordersRepository.create(order);

    return {
      order,
    };
  }
}
