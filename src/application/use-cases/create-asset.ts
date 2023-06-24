import { Injectable } from '@nestjs/common';
import { AssetAlreadyExistsError } from '@Application/errors/asset-already-exists';
import { AssetsRepository } from '@Application/repositories/assets-repository';
import { Asset } from '@Domain/enterprise/entities/asset';

interface CreateAssetUseCaseRequest {
  identifier: string;
  symbol: string;
}

interface CreateAssetUseCaseResponse {
  asset: Asset;
}

@Injectable()
export class CreateAssetUseCase {
  public constructor(private readonly assetsRepository: AssetsRepository) {}

  public async execute({
    identifier,
    symbol,
  }: CreateAssetUseCaseRequest): Promise<CreateAssetUseCaseResponse> {
    const assetAlreadyExists = await this.assetsRepository.findByIdentifier(
      identifier,
    );

    console.log(assetAlreadyExists);

    if (assetAlreadyExists) {
      throw new AssetAlreadyExistsError();
    }

    const asset = Asset.create({
      identifier,
      symbol,
    });

    await this.assetsRepository.create(asset);

    return {
      asset,
    };
  }
}
