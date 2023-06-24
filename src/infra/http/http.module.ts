import { Module } from '@nestjs/common';

import { GetAssetsUseCase } from '@Application/use-cases/get-assets';
import { CreateAssetUseCase } from '@Application/use-cases/create-asset';
import { GetOrdersUseCase } from '@Application/use-cases/get-orders';
import { CreateOrderUseCase } from '@Application/use-cases/create-order';
import { PersistenceModule } from '@Infra/persistence/persistence.module';

import { AssetsController } from './controllers/assets.controller';
import { OrdersController } from './controllers/orders.controller';

@Module({
  imports: [PersistenceModule],
  controllers: [AssetsController, OrdersController],
  providers: [
    GetAssetsUseCase,
    CreateAssetUseCase,
    GetOrdersUseCase,
    CreateOrderUseCase,
  ],
})
export class HttpModule {}
