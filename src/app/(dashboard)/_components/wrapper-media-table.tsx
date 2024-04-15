import { auth } from '@clerk/nextjs';
import { listMedia } from '@/server-actions/media/get-media';
import { MediaTable, MeditaTableSkeleton } from './media-table';
import { Skeleton } from '@/components/ui/skeleton';

export async function WrapperMediaTable() {
    const { userId: userExternalId }: { userId: string | null } = auth();

    if (!userExternalId) return <EmptyMediaTable />;

    const medias = await listMedia(userExternalId);

    return (
        <div className="mt-10 w-full">
            {medias.length > 0 ? (
                <MediaTable medias={medias} />
            ) : (
                <EmptyMediaTable />
            )}
        </div>
    );
}

function EmptyMediaTable() {
    return (
        <div className="w-full text-center flex items-center justify-center gap-2">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Your medias will appear here
            </h2>
        </div>
    );
}

export function WrapperMediaTableSkeleton() {
    return (
        <Skeleton className="mt-10 w-full">
            <MeditaTableSkeleton />
        </Skeleton>
    );
}
