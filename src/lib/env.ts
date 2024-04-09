import { z } from 'zod';

const envSchema = z.object({
    DATABASE_URL: z.string(),
    BUCKET_MEDIA_NAME: z.string(),
    BUCKET_MEDIA_REGION: z.string(),
    AWS_ACCESS_KEY: z.string(),
    AWS_SECRET_ACCESS_KEY_ID: z.string(),
    OPENAI_KEY: z.string(),
    OPENAI_ORGANIZATION: z.string(),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
    CLERK_SECRET_KEY: z.string(),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string(),
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string(),
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string(),
    CLERK_WEBHOOK_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
