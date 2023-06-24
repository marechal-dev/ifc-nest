import { Entity } from '@Core/entities/entity';
import { UniqueEntityId } from '@Core/entities/value-objects/unique-entity-id';

interface AssetProps {
  identifier: string;
  symbol: string;
}

export class Asset extends Entity<AssetProps> {
  public static create(props: AssetProps, id?: UniqueEntityId): Asset {
    const asset = new Asset(props, id);

    return asset;
  }

  public get identifier(): string {
    return this.props.identifier;
  }

  public get symbol(): string {
    return this.props.symbol;
  }
}
