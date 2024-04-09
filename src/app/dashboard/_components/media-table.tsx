"use client";
import { Media } from "@prisma/client";
import { UploadCloud, AudioWaveform } from "lucide-react";

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { MediaTableRow } from "./media-table-row";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
    medias: Media[];
};

export function MediaTable({ medias }: Props) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[148px]"></TableHead>
                        <TableHead>Information</TableHead>
                        <TableHead>Metadata</TableHead>
                        <TableHead>
                            <div className="flex items-center gap-2">
                                <UploadCloud size={16} /> Transcription
                            </div>
                        </TableHead>
                        <TableHead>
                            <div className="flex items-center gap-2">
                                <AudioWaveform size={16} /> Subtitles
                            </div>
                        </TableHead>
                        <TableHead className="text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {medias.map(media => {
                        return <MediaTableRow key={media.id} media={media} />;
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

export function MeditaTableSkeleton() {
    return <Skeleton className="rounded-md border h-[145.75px]" />;
}
