import { z } from "zod";

const ACCEPTED_MEDIA_TYPES = ["video/mp3", "video/mp4"];

export const CreateMediaFormSchema = z.object({
  video: z
    .any()
    .refine(
      file => ACCEPTED_MEDIA_TYPES.includes(file?.type),
      "Only .mp3, .mp4 formats are supported."
    ),
  language: z.string().min(2, {
    message: "Language must be at least 2 characters",
  }),
});

export type CreateMedia = z.infer<typeof CreateMediaFormSchema>;
