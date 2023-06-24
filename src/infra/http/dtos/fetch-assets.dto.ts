import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const fetchAssetsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(10),
});

export class FetchAssetsDTO extends createZodDto(fetchAssetsSchema) {}
