'use server';
import { OpenaiVerboseJsonResponse } from '@/types/openai-verbose-json-response';
import { stringToFile } from '@/helpers/string-to-file';
import { jsonToSrt } from '@/helpers/json-to-srt';
import { prisma } from '@/lib/prisma';
import { StorageProvider } from '../providers/storage-provider';

export async function uploadMediaSubtitle(
    mediaId: string,
    subtitle: OpenaiVerboseJsonResponse
) {
    try {
        const mediaTitle = 'video';

        const convertedFileToSrt = jsonToSrt(subtitle.segments);

        const storageProvider = new StorageProvider();

        const file = stringToFile({
            content: convertedFileToSrt,
            fileName: `${mediaTitle}-subtitle.srt`,
            fileType: 'text/srt',
        });

        console.log('converted json to srt', JSON.stringify(file, null, 2));

        const uploadedSubtitleUrl = await storageProvider.uploadFile(file);

        console.log('uploaded file to s3');

        await prisma.media.update({
            where: {
                id: mediaId,
            },
            data: {
                url_subtitle: uploadedSubtitleUrl,
            },
        });

        console.log('updated subtitle url on database');

        return uploadedSubtitleUrl;
    } catch (error) {
        console.log('Error uploading subtitle - ', error);
        throw new Error('Error uploading subtitle');
    }
}

export async function uploadMediaFileWithSubtitle(formData: FormData) {
    try {
        const file = formData.get('file') as File;
        const mediaId = formData.get('mediaId') as string;

        const storageProvider = new StorageProvider();

        const uploadedMediaWithSubtitle = await storageProvider.uploadFile(
            file
        );

        console.log('uploaded file to s3');

        await prisma.media.update({
            where: {
                id: mediaId,
            },
            data: {
                url_media_with_subtitle: uploadedMediaWithSubtitle,
            },
        });

        console.log('updated subtitle url on database');

        return uploadedMediaWithSubtitle;
    } catch (error) {
        console.log('Error uploading subtitle - ', error);
        throw new Error('Error uploading subtitle');
    }
}
