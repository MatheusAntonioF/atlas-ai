'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';

import { CreateMediaFormSchema } from '@/types/create-media-type';
import { StorageProvider } from '../providers/storage-provider';
import { prisma } from '@/lib/prisma';
import { convertFileSizeToMb } from '@/helpers/convert-file-size-to-mb';

export async function createMedia(formData: FormData) {
    try {
        const video = formData.get('video') as File;
        const language = formData.get('language') as string;

        const data = CreateMediaFormSchema.parse({
            video,
            language,
        });

        const { userId } = auth();

        if (!userId) {
            throw new Error('User is not authenticated');
        }

        const foundUser = await prisma.user.findFirst({
            where: {
                external_id: userId,
            },
        });

        if (!foundUser) {
            throw new Error('User not found');
        }

        const url = await uploadMediaToS3(data.video);

        await prisma.media.create({
            data: {
                title: data.video.name,
                size: convertFileSizeToMb(data.video.size),
                url,
                language: data.language,
                userId: foundUser.id,
            },
        });

        revalidatePath('/');
    } catch (error) {
        console.error('Error creating media - ', error);
        throw new Error('Error creating media');
    }
}

async function uploadMediaToS3(media: File) {
    const storageProvider = new StorageProvider();

    const url = await storageProvider.uploadFile(media);

    return url;
}
