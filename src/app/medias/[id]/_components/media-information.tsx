"use client";

import { LoadingIcon } from "@/assets/LoagingIcon";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { convertVideoToWav } from "@/lib/ffmpeg";
import { processMediaWithAI } from "@/server-actions/media/openai/process-media-with-ai";
import { Media } from "@prisma/client";
import { Bot, Captions } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
    media: Media | null;
};

export function MediaInformation({ media }: Props) {
    const [isLoading, setIsLoading] = useState(false);

    const onGenerateTranscription = async () => {
        try {
            setIsLoading(true);
            if (!media) return;

            const audio = await convertVideoToWav(media.url);

            const formData = new FormData();

            formData.append("file", audio);
            formData.append("mediaId", media.id);

            await processMediaWithAI(formData);
        } catch (error) {
            toast.error(
                "An error occurred while generating the transcription! Please try again"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-2 gap-8 mt-10">
            <div className="rounded-md border p-4">
                <div className="flex gap-2">
                    <Button
                        className="flex gap-2"
                        onClick={onGenerateTranscription}
                    >
                        Generate transcription{" "}
                        {isLoading ? <LoadingIcon /> : <Bot />}
                    </Button>
                    <Button variant="secondary" className="flex gap-2">
                        Attach subtitles <Captions />
                    </Button>
                </div>
                <Textarea
                    className="mt-8"
                    placeholder="Transcription will appear here"
                    disabled
                />
            </div>
            <div className="rounded-md border p-4">video preview</div>
        </div>
    );
}
