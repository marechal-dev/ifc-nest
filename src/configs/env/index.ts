import 'dotenv/config';

import { z } from 'zod';

const envSchemaValidator = z.object({
  NODE_ENV: z
    .enum(['development', 'production'] as const)
    .default('development'),
  PORT: z.coerce.number().default(3000),
});

const validation = envSchemaValidator.safeParse(process.env);

if (!validation.success) {
  console.error('Incorrect environment variables');
  process.exit(1);
}

const env = validation.data;

export default env;
