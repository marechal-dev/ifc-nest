import { PagedList } from '@Core/repositories/paged-list';
import { PaginationParams } from '@Core/repositories/pagination-params';
import { Asset } from '@Domain/enterprise/entities/asset';

export abstract class AssetsRepository {
  abstract create(asset: Asset): Promise<Asset>;
  abstract findByIdentifier(identifier: string): Promise<Asset | null>;
  abstract fetch(paginationParams: PaginationParams): Promise<PagedList<Asset>>;
}
