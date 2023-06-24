import { Injectable } from '@nestjs/common';

import { PagedList } from '@Core/repositories/paged-list';
import { PaginationParams } from '@Core/repositories/pagination-params';
import { Asset } from '@Domain/enterprise/entities/asset';
import { AssetsRepository } from '@Application/repositories/assets-repository';

interface GetAssetsUseCaseRequest {
  paginationParams: PaginationParams;
}

interface GetAssetsUseCaseResponse {
  payload: PagedList<Asset>;
}

@Injectable()
export class GetAssetsUseCase {
  public constructor(private readonly assetsRepository: AssetsRepository) {}

  public async execute({
    paginationParams,
  }: GetAssetsUseCaseRequest): Promise<GetAssetsUseCaseResponse> {
    const payload = await this.assetsRepository.fetch(paginationParams);

    return {
      payload,
    };
  }
}
