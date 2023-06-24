import {
  UsePipes,
  Body,
  Controller,
  Get,
  Post,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ZodValidationPipe } from 'nestjs-zod';

import { PagedListHttpPayload } from '@Core/repositories/paged-list';

import { Asset } from '@Domain/enterprise/entities/asset';

import { CreateAssetUseCase } from '@Application/use-cases/create-asset';
import { GetAssetsUseCase } from '@Application/use-cases/get-assets';

import { CreateAssetDTO } from '../dtos/create-asset.dto';
import { FetchAssetsDTO } from '../dtos/fetch-assets.dto';
import {
  AssetHttpPayload,
  AssetsViewModel,
} from '../view-models/assets.view-model';

@Controller('assets')
@ApiTags('assets')
@UsePipes(ZodValidationPipe)
export class AssetsController {
  public constructor(
    private readonly getAssetsUseCase: GetAssetsUseCase,
    private readonly createAssetUseCase: CreateAssetUseCase,
  ) {}

  @Get()
  public async fetch(
    @Query() fetchAssetsDTO: FetchAssetsDTO,
  ): Promise<PagedListHttpPayload<Asset>> {
    const assetsPagedList = await this.getAssetsUseCase.execute({
      paginationParams: {
        page: fetchAssetsDTO.page,
        pageSize: fetchAssetsDTO.pageSize,
      },
    });

    return assetsPagedList.payload.toHttpPayload(AssetsViewModel.toHttp);
  }

  @Post()
  public async create(
    @Body() createAssetDTO: CreateAssetDTO,
  ): Promise<AssetHttpPayload> {
    try {
      const { asset } = await this.createAssetUseCase.execute({
        identifier: createAssetDTO.identifier,
        symbol: createAssetDTO.symbol,
      });

      console.log(asset);

      return AssetsViewModel.toHttp(asset);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Asset already exists.', {
        cause: error,
        description: 'Asset already exists.',
      });
    }
  }
}
