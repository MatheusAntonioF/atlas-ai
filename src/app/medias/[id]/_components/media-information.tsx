"use client";

import { LoadingIcon } from "@/assets/LoagingIcon";
import { Button } from "@/components/ui/button";
import { PaperclipIcon } from "lucide-react";
import { attachSubtitleToVideo, convertVideoToWav } from "@/lib/ffmpeg";
import { processMediaWithAI } from "@/server-actions/media/openai/process-media-with-ai";
import { OpenaiVerboseJsonResponse } from "@/types/openai-verbose-json-response";
import { Media } from "@prisma/client";
import { Bot, Captions } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SubtitleList } from "./subtitle-list";
import {
    uploadMediaFileWithSubtitle,
    uploadMediaSubtitle,
} from "@/server-actions/media/upload-media-subtitle";

type Props = {
    media: Media;
};

export function MediaInformation({ media }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingAttachSub, setIsLoadingAttachSub] = useState(false);
    const [videoWithSubtitle, setVideoWithSubtitle] = useState<string | null>(
        null
    );
    const [subtitle, setSubtitle] = useState<OpenaiVerboseJsonResponse>(
        {} as OpenaiVerboseJsonResponse
    );

    const onGenerateTranscription = async () => {
        try {
            setIsLoading(true);
            if (!media) return;

            const audio = await convertVideoToWav(media.url);

            if (!audio) throw new Error("Error converting video to audio");

            const formData = new FormData();

            formData.append("file", audio);
            formData.append("mediaId", media.id);

            const response = await processMediaWithAI(formData);

            setSubtitle(response);
        } catch (error) {
            console.log("🚀 ~ error:", error);
            toast.error(
                "An error occurred while generating the transcription! Please try again"
            );
        } finally {
            setIsLoading(false);
        }
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
        <div className="flex w-full gap-8 mt-10 grid-col">
            <div className="rounded-md border p-4 h-auto flex-grow">
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
            </div>
            <div className="rounded-md border p-4 h-80 flex-grow">
                {videoWithSubtitle && (
                    <video
                        src={videoWithSubtitle}
                        controls
                        className="pointer-events-none aspect-video rounded-md w-full h-full"
                        preload="metadata"
                    />
                )}
            </div>
        </div>
    );
}
