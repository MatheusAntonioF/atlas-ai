"use client";
import { Bot } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { LoadingIcon } from "@/assets/LoagingIcon";
import { Button } from "@/components/ui/button";
import { PaperclipIcon } from "lucide-react";
import { attachSubtitleToVideo, convertVideoToWav } from "@/lib/ffmpeg";
import { processMediaWithAI } from "@/server-actions/media/openai/process-media-with-ai";
import { OpenaiVerboseJsonResponse } from "@/types/openai-verbose-json-response";
import { Media } from "@prisma/client";
import {
    uploadMediaFileWithSubtitle,
    uploadMediaSubtitle,
} from "@/server-actions/media/upload-media-subtitle";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

import { SubtitleList } from "./subtitle-list";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
    media: Media;
};

export function MediaInformation({ media }: Props) {
    const [isLoading, startTransition] = useTransition();
    const [isLoadingAttachSub, setIsLoadingAttachSub] = useState(false);
    const [videoWithSubtitle, setVideoWithSubtitle] = useState<string | null>(
        null
    );
    const [subtitle, setSubtitle] = useState<OpenaiVerboseJsonResponse>(
        {} as OpenaiVerboseJsonResponse
    );

    const onGenerateTranscription = async () => {
        startTransition(async () => {
            try {
                if (!media) return;

                const audio = await convertVideoToWav(media.url);

                if (!audio) throw new Error("Error converting video to audio");

                const formData = new FormData();

                formData.append("file", audio);

                const response = await processMediaWithAI(formData);

                setSubtitle(response);
            } catch (error) {
                toast.error(
                    "An error occurred while generating the transcription! Please try again"
                );
            }
        });
    };

    const onAttachSubtitleToVideo = async () => {
        try {
            setIsLoadingAttachSub(true);

            const subtitleUrl = await uploadMediaSubtitle(media.id, subtitle);

            const fileWithSubtitle = await attachSubtitleToVideo(
                media.url,
                subtitleUrl
            );

            if (!fileWithSubtitle) {
                throw new Error("Error attaching subtitle to the video");
            }

            const formData = new FormData();

            formData.append("file", fileWithSubtitle);
            formData.append("mediaId", media.id);

            const videoWithSubtitleUrl = await uploadMediaFileWithSubtitle(
                formData
            );

            setVideoWithSubtitle(videoWithSubtitleUrl);

            toast("Subtitle attached to the video");
        } catch (error) {
            toast(
                "An error occurred while attaching the subtitle! Please try again"
            );
        } finally {
            setIsLoadingAttachSub(false);
        }
    };

    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="flex flex-col w-full gap-8 mt-10 min-h-[400px] rounded-lg border"
        >
            <ResizablePanel className="p-4 h-full" defaultSize={40}>
                <Button
                    className="flex gap-2 mb-4"
                    onClick={onGenerateTranscription}
                    disabled={isLoading}
                >
                    Generate transcription{" "}
                    {isLoading ? <LoadingIcon /> : <Bot />}
                </Button>
                {subtitle.segments && (
                    <>
                        <SubtitleList subtitle={subtitle} />
                        <Button
                            variant="secondary"
                            onClick={onAttachSubtitleToVideo}
                            disabled={isLoadingAttachSub}
                        >
                            Attach subtitle{" "}
                            <PaperclipIcon className="ml-2" size={18} />
                        </Button>
                    </>
                )}
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel className="p-4 h-full" defaultSize={60}>
                <video
                    className="aspect-video rounded-md w-full h-full"
                    controls
                >
                    <source
                        src={videoWithSubtitle || media.url}
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}

export function MediaInformationSkeleton() {
    return (
        <Skeleton className="flex flex-col w-full gap-8 mt-10 min-h-[400px] rounded-lg border" />
    );
}
