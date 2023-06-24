import { Order } from '@Domain/enterprise/entities/order';

export interface OrderHttpViewModel {
  id: string;
  asset: {
    id: string;
    identifier: string;
    symbol: string;
  };
  price: number;
  status: string;
}

export class OrdersViewModel {
  public static toHttp(order: Order): OrderHttpViewModel {
    return {
      id: order.id.toString(),
      asset: {
        id: order.asset.id.toString(),
        identifier: order.asset.identifier,
        symbol: order.asset.symbol,
      },
      price: order.price,
      status: order.status,
    };
  }
}
