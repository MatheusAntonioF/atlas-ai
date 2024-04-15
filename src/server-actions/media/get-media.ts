'use server';

import { prisma } from '@/lib/prisma';
import { Media } from '@prisma/client';

export async function listMedia(userExternalId: string): Promise<Media[]> {
    try {
        const foundUser = await prisma.user.findFirst({
            where: {
                external_id: userExternalId,
            },
        });

        if (!foundUser) return [];

        const medias = await prisma.media.findMany({
            where: {
                userId: foundUser.id,
            },
        });
        console.log('🚀 ~ medias:', medias);

        return medias;
    } catch (error) {
        console.error('Error listing media - ', error);
        throw new Error('Error listing media');
    }
}

export async function getMediaById(id: string): Promise<Media | null> {
    try {
        const foundMedia = await prisma.media.findUnique({
            where: {
                id,
            },
        });

        return foundMedia;
    } catch (error) {
        console.error('Error getting media - ', error);
        throw new Error('Error getting media');
    }
}
