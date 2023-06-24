import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const fetchOrdersSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(10),
});

export class FetchOrdersDTO extends createZodDto(fetchOrdersSchema) {}
