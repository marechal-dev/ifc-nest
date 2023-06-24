import { PagedList } from '@Core/repositories/paged-list';
import { PaginationParams } from '@Core/repositories/pagination-params';
import { Order } from '@Domain/enterprise/entities/order';

export abstract class OrdersRepository {
  abstract create(order: Order): Promise<Order>;
  abstract fetch(paginationParams: PaginationParams): Promise<PagedList<Order>>;
}
