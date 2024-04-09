import { SmileIcon } from "lucide-react";
import { listMedia } from "@/server-actions/media/get-media";
import { MediaTable, MeditaTableSkeleton } from "./media-table";
import { Skeleton } from "@/components/ui/skeleton";

export async function WrapperMediaTable() {
    const medias = await listMedia();

    return (
        <div className="mt-10 w-full">
            {medias.length > 0 ? (
                <MediaTable medias={medias} />
            ) : (
                <div className="w-full text-center flex items-center justify-center gap-2">
                    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        Your medias will appear here
                    </h2>
                    <SmileIcon />
                </div>
            )}
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
