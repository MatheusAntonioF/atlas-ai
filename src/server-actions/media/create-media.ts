"use server";

import { CreateMediaFormSchema } from "@/types/create-media-type";

export async function createMedia(formData: FormData) {
  try {
    const video = formData.get("video") as File;
    const language = formData.get("language") as string;

    const data = CreateMediaFormSchema.parse({
      video,
      language,
    });

    console.log("🚀 ~ data:", data);
  } catch (error) {
    console.error("Error creating media:", error);
    throw new Error("Error creating media");
  }
}
