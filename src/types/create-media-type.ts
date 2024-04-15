import { z } from 'zod';

const ACCEPTED_MEDIA_TYPES = ['video/mp3', 'video/mp4'];

export const CreateMediaFormSchema = z.object({
    video: z
        .any()
        .refine(
            file => ACCEPTED_MEDIA_TYPES.includes(file?.type),
            'Only .mp3, .mp4 formats are supported.'
        ),
});

export type CreateMedia = z.infer<typeof CreateMediaFormSchema>;
