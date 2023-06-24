import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const createOrderSchema = z.object({
  assetId: z.string(),
  price: z.number().min(1.0),
});

export class CreateOrderDTO extends createZodDto(createOrderSchema) {}
