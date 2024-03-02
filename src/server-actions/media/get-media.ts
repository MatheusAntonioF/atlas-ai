"use server";

import { prisma } from "@/lib/prisma";
import { Media } from "@prisma/client";

export async function listMedia(): Promise<Media[]> {
  try {
    const medias = await prisma.media.findMany();

    return medias;
  } catch (error) {
    console.error("Error listing media - ", error);
    throw new Error("Error listing media");
  }
}
