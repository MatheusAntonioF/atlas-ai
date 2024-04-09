import { z } from 'zod';

export const ClerkUserCreatedSchema = z.object({
    id: z.string(),
    first_name: z.string(),
    has_image: z.boolean(),
    last_name: z.string(),
    image_url: z.string(),
});

export type ClerkUserCreated = z.infer<typeof ClerkUserCreatedSchema>;

export const ClerkUserDeletedSchema = z.object({
    id: z.string(),
    deleted: z.boolean(),
});

export type ClerkUserDeleted = z.infer<typeof ClerkUserDeletedSchema>;
