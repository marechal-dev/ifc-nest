import { UniqueEntityId } from '@Core/entities/value-objects/unique-entity-id';
import { Entity } from '@Core/entities/entity';
import { Optional } from '@Core/types/optional';

import { OrderStatus } from './enums/order-status';
import { Asset } from './asset';

interface OrderProps {
  assetId: string;
  asset: Asset;
  price: number;
  status: OrderStatus;
}

export class Order extends Entity<OrderProps> {
  public static create(
    props: Optional<OrderProps, 'status'>,
    id?: UniqueEntityId,
  ): Order {
    const order = new Order(
      {
        ...props,
        status: props.status ?? 'Pending',
      },
      id,
    );

    return order;
  }

  public get asset(): Asset {
    return this.props.asset;
  }

  public get assetId(): string {
    return this.props.assetId;
  }

  public get price(): number {
    return this.props.price;
  }

  public get status(): OrderStatus {
    return this.props.status;
  }
}
