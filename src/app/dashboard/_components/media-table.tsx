"use client";
import { Media } from "@prisma/client";
import {
  MoreHorizontal,
  Trash,
  UploadCloud,
  AudioWaveform,
  Sparkles,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type Props = {
  medias: Media[];
};

export function MediaTable({ medias }: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[148px]">Information</TableHead>
            <TableHead className="w-[240px]">Metadata</TableHead>
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
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medias.map(media => {
            return (
              <TableRow key={media.id}>
                <TableCell>
                  {/* <video
                    src={media.url}
                    controls={false}
                    className="pointer-events-none aspect-video rounded-md"
                    preload="metadata"
                  /> */}
                  <video
                    controls={false}
                    className="pointer-events-none aspect-video rounded-md"
                    preload="metadata"
                  >
                    <source src={media.url} type="video/mp4" />
                  </video>
                </TableCell>
                <TableCell>metadata</TableCell>
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
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>
                        <Button
                          className="flex items-center gap-2"
                          variant="destructive"
                        >
                          <Trash size={14} />
                          Delete
                        </Button>
                      </DropdownMenuLabel>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
