import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const createAssetSchema = z.object({
  identifier: z.string().describe('The Asset identifier'),
  symbol: z
    .string()
    .describe('The Asset symbol, it should be related to the identifier.'),
});

export class CreateAssetDTO extends createZodDto(createAssetSchema) {}
