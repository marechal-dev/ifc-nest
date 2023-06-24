import { Injectable } from '@nestjs/common';

import { PaginationParams } from '@Core/repositories/pagination-params';
import { PagedList } from '@Core/repositories/paged-list';
import { OrdersRepository } from '@Application/repositories/orders-repository';
import { Order } from '@Domain/enterprise/entities/order';

interface GetOrdersUseCaseRequest {
  paginationParams: PaginationParams;
}

interface GetOrdersUseCaseResponse {
  payload: PagedList<Order>;
}

@Injectable()
export class GetOrdersUseCase {
  public constructor(private readonly ordersRepository: OrdersRepository) {}

  public async execute({
    paginationParams,
  }: GetOrdersUseCaseRequest): Promise<GetOrdersUseCaseResponse> {
    const payload = await this.ordersRepository.fetch(paginationParams);

    return {
      payload,
    };
  }
}
