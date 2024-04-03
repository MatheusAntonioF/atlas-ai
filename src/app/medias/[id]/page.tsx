import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { Suspense } from "react";
import {
    WrapperMediaInformation,
    WrapperMediaInformationSkeleton,
} from "./_components/wrapper-media-information";

type Props = {
    params: {
        id: string;
    };
};

export default async function Page({ params: { id: mediaId } }: Props) {
    return (
        <div className="flex flex-col w-full">
            <Link
                className="flex items-center gap-2 mb-8 scale-100 hover:scale-105 transition"
                href="/dashboard"
            >
                <ChevronLeftIcon /> Go back
            </Link>

            <Suspense fallback={<WrapperMediaInformationSkeleton />}>
                <WrapperMediaInformation mediaId={mediaId} />
            </Suspense>
        </div>
    );
}
