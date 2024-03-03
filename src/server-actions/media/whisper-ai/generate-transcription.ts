"use server";

import { getObjectKeyFromUrl } from "@/helpers/get-object-key-from-url";
import { prisma } from "@/lib/prisma";
import { StorageProvider } from "@/server-actions/providers/storage-provider";

export async function generateTranscription(mediaId: string) {
  try {
    const foundMedia = await prisma.media.findUnique({
      where: {
        id: mediaId,
      },
    });
    console.log("🚀 ~ foundMedia:", foundMedia);

    if (!foundMedia) return undefined;

    const filePath = downloadFileFromS3(foundMedia.url);
  } catch (error) {
    console.error("Error generating transcription - ", error);
    throw new Error("Error generating transcription");
  }
}

async function downloadFileFromS3(url: string) {
  const key = getObjectKeyFromUrl(url);

  const storageProvider = new StorageProvider();

  storageProvider.downloadFile(key);
}
