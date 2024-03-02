"use client";

import { Sparkles, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatBytes } from "@/helpers/format-bytes";
import { Media } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { SyntheticEvent, useState } from "react";
import { formatSecondsToMinutes } from "@/helpers/format-seconds-to-minutes";

type Props = {
  media: Media;
};

export function MediaTableRow({ media }: Props) {
  const [videoDuration, setVideoDuration] = useState(0);

  function handleLoadedMetadata(event: SyntheticEvent<HTMLVideoElement>) {
    setVideoDuration(event.currentTarget.duration);
  }

  return (
    <TableRow key={media.id}>
      <TableCell>
        <video
          src={media.url}
          controls={false}
          className="pointer-events-none aspect-video rounded-md"
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
        />
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <p>{media.title}</p>
          <p>{media.language}</p>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
          <span className="truncate">{media.title}</span>
          <span className="font-medium">
            {formatBytes(Number(media.size))} -{" "}
            {videoDuration ? formatSecondsToMinutes(videoDuration) : null}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center">
          <Progress value={50} className="w-[60%] h-2" />
          <Button variant="outline" className="ml-2">
            <Sparkles size={18} />
          </Button>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center">
          <Progress value={50} className="w-[60%] h-2" />
          <Button variant="outline" className="ml-2">
            <Sparkles size={18} />
          </Button>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <Button className="flex items-center gap-2" variant="destructive">
                <Trash size={14} />
                Delete
              </Button>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
