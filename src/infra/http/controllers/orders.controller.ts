import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { FetchOrdersDTO } from '../dtos/fetch-orders.dto';
import { CreateOrderDTO } from '../dtos/create-order.dto';
import { GetOrdersUseCase } from '@Application/use-cases/get-orders';
import { CreateOrderUseCase } from '@Application/use-cases/create-order';
import { OrdersViewModel } from '../view-models/orders.view-model';
import { ApiTags } from '@nestjs/swagger';

@Controller('orders')
@ApiTags('orders')
@UsePipes(ZodValidationPipe)
export class OrdersController {
  public constructor(
    private readonly getOrdersUseCase: GetOrdersUseCase,
    private readonly createOrderUseCase: CreateOrderUseCase,
  ) {}

  @Get()
  public async fetch(@Query() fetchOrdersDTO: FetchOrdersDTO) {
    const ordersPagedList = await this.getOrdersUseCase.execute({
      paginationParams: {
        page: fetchOrdersDTO.page,
        pageSize: fetchOrdersDTO.pageSize,
      },
    });

    return ordersPagedList.payload.toHttpPayload(OrdersViewModel.toHttp);
  }

  @Post()
  public async create(@Body() createOrderDTO: CreateOrderDTO) {
    const { order } = await this.createOrderUseCase.execute(createOrderDTO);

    return OrdersViewModel.toHttp(order);
  }
}
