import { getMediaById } from "@/server-actions/media/get-media";
import {
    MediaInformation,
    MediaInformationSkeleton,
} from "./media-information";
import { Skeleton } from "@/components/ui/skeleton";

export async function WrapperMediaInformation({
    mediaId,
}: {
    mediaId: string;
}) {
    const media = await getMediaById(mediaId);

    return (
        <>
            {media && (
                <>
                    <h2 className="scroll-m-20 my-2 text-3xl font-semibold tracking-tight">
                        {media.title}
                    </h2>
                    <MediaInformation media={media} />
                </>
            )}
        </>
    );
}

export function WrapperMediaInformationSkeleton() {
    return (
        <>
            <Skeleton className="my-2 w-full h-[36px]" />
            <MediaInformationSkeleton />
        </>
    );
}
