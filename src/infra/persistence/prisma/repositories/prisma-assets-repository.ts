import { Injectable } from '@nestjs/common';

import { PagedList } from '@Core/repositories/paged-list';
import { PaginationParams } from '@Core/repositories/pagination-params';
import { Asset } from '@Domain/enterprise/entities/asset';
import { AssetsRepository } from '@Application/repositories/assets-repository';

import { PrismaService } from '../prisma.service';
import { PrismaAssetMapper } from '../mappers/prisma-asset-mapper';

@Injectable()
export class PrismaAssetsRepository extends AssetsRepository {
  public constructor(private readonly prisma: PrismaService) {
    super();
  }

  public async create(asset: Asset): Promise<Asset> {
    const raw = PrismaAssetMapper.toPrisma(asset);

    await this.prisma.asset.create({
      data: raw,
    });

    return asset;
  }

  public async fetch(
    paginationParams: PaginationParams,
  ): Promise<PagedList<Asset>> {
    const [itemsCount, assets] = await Promise.all([
      this.prisma.asset.count(),
      this.prisma.asset.findMany({
        skip: (paginationParams.page - 1) * paginationParams.pageSize,
        take: paginationParams.pageSize,
      }),
    ]);

    return new PagedList(
      assets.map(PrismaAssetMapper.toDomain),
      paginationParams.page,
      paginationParams.pageSize,
      itemsCount,
    );
  }

  public async findByIdentifier(identifier: string): Promise<Asset | null> {
    const asset = await this.prisma.asset.findUnique({
      where: {
        identifier,
      },
    });

    console.log(asset);

    if (!asset) {
      return null;
    }

    return PrismaAssetMapper.toDomain(asset);
  }
}
