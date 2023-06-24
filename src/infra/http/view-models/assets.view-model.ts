import { Asset } from '@Domain/enterprise/entities/asset';

export interface AssetHttpPayload {
  id: string;
  identifier: string;
  symbol: string;
}

export class AssetsViewModel {
  public static toHttp(asset: Asset): AssetHttpPayload {
    return {
      id: asset.id.toString(),
      identifier: asset.identifier,
      symbol: asset.symbol,
    };
  }
}
