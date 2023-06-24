import { ObjectId } from 'bson';
import { Prisma, Order as RawOrder } from '@prisma/client';

import { UniqueEntityId } from '@Core/entities/value-objects/unique-entity-id';
import { Asset } from '@Domain/enterprise/entities/asset';
import { Order } from '@Domain/enterprise/entities/order';

export type RawOrderWithAsset = Prisma.OrderGetPayload<{
  include: {
    asset: true;
  };
}>;

export class PrismaOrderMapper {
  public static toDomain(raw: RawOrderWithAsset): Order {
    return Order.create(
      {
        asset: Asset.create(
          raw.asset,
          new UniqueEntityId(ObjectId.createFromHexString(raw.asset.id)),
        ),
        assetId: raw.assetId,
        price: raw.price,
        status: raw.status,
      },
      new UniqueEntityId(ObjectId.createFromHexString(raw.id)),
    );
  }

  public static toPrisma(order: Order): RawOrder {
    return {
      id: order.id.toString(),
      assetId: order.assetId,
      price: order.price,
      status: order.status,
    };
  }
}
