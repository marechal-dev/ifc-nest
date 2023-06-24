import { UniqueEntityId } from '@Core/entities/value-objects/unique-entity-id';
import { Asset } from '@Domain/enterprise/entities/asset';
import { Asset as RawAsset } from '@prisma/client';
import { ObjectId } from 'bson';

export class PrismaAssetMapper {
  public static toDomain(raw: RawAsset): Asset {
    return Asset.create(
      {
        identifier: raw.identifier,
        symbol: raw.symbol,
      },
      new UniqueEntityId(ObjectId.createFromHexString(raw.id)),
    );
  }

  public static toPrisma(asset: Asset): RawAsset {
    return {
      id: asset.id.toString(),
      identifier: asset.identifier,
      symbol: asset.symbol,
    };
  }
}
