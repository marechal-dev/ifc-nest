import { Module } from '@nestjs/common';

import { AssetsRepository } from '@Application/repositories/assets-repository';
import { OrdersRepository } from '@Application/repositories/orders-repository';

import { PrismaService } from './prisma/prisma.service';
import { PrismaAssetsRepository } from './prisma/repositories/prisma-assets-repository';
import { PrismaOrderRepository } from './prisma/repositories/prisma-orders-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: AssetsRepository,
      useClass: PrismaAssetsRepository,
    },
    {
      provide: OrdersRepository,
      useClass: PrismaOrderRepository,
    },
  ],
  exports: [PrismaService, AssetsRepository, OrdersRepository],
})
export class PersistenceModule {}
