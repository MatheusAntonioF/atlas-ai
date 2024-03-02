import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  BUCKET_MEDIA_NAME: z.string(),
  BUCKET_MEDIA_REGION: z.string(),
  AWS_ACCESS_KEY: z.string(),
  AWS_SECRET_ACCESS_KEY_ID: z.string(),
});

export const env = envSchema.parse(process.env);
