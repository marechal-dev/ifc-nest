import { Injectable } from '@nestjs/common';

import { PagedList } from '@Core/repositories/paged-list';
import { PaginationParams } from '@Core/repositories/pagination-params';
import { Order } from '@Domain/enterprise/entities/order';
import { OrdersRepository } from '@Application/repositories/orders-repository';

import { PrismaService } from '../prisma.service';
import { PrismaOrderMapper } from '../mappers/prisma-order-mapper';

@Injectable()
export class PrismaOrderRepository extends OrdersRepository {
  public constructor(private readonly prisma: PrismaService) {
    super();
  }

  public async create(order: Order): Promise<Order> {
    const raw = PrismaOrderMapper.toPrisma(order);

    await this.prisma.order.create({
      data: raw,
    });

    return order;
  }

  public async fetch(
    paginationParams: PaginationParams,
  ): Promise<PagedList<Order>> {
    const [itemsCount, orders] = await Promise.all([
      this.prisma.order.count(),
      this.prisma.order.findMany({
        include: {
          asset: true,
        },
        skip: (paginationParams.page - 1) * paginationParams.pageSize,
        take: paginationParams.pageSize,
      }),
    ]);

    return new PagedList(
      orders.map(PrismaOrderMapper.toDomain),
      paginationParams.page,
      paginationParams.pageSize,
      itemsCount,
    );
  }
}
