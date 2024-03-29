import { getMediaById } from "@/server-actions/media/get-media";
import { MediaInformation } from "./_components/media-information";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";

type Props = {
    params: {
        id: string;
    };
};

export default async function Page({ params: { id: mediaId } }: Props) {
    const media = await getMediaById(mediaId);

    return (
        <div className="flex flex-col w-full">
            <Link
                className="flex items-center gap-2 mb-8 scale-100 hover:scale-105 transition"
                href="/dashboard"
            >
                <ChevronLeftIcon /> Go back
            </Link>

            {media && (
                <>
                    <h2 className="scroll-m-20 my-2 text-3xl font-semibold tracking-tight">
                        {media.title}
                    </h2>
                    <MediaInformation media={media} />
                </>
            )}
        </div>
    );
}
