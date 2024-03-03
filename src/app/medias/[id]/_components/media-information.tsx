"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generateTranscription } from "@/server-actions/media/whisper-ai/generate-transcription";
import { Media } from "@prisma/client";
import { Bot, Captions } from "lucide-react";
import { toast } from "sonner";

type Props = {
  media: Media | null;
};

export function MediaInformation({ media }: Props) {
  const onGenerateTranscription = () => {
    try {
      if (!media) return;

      generateTranscription(media.id);
    } catch (error) {
      toast.error(
        "An error occurred while generating the transcription! Please try again"
      );
    }
  };

  return (
    <div className="grid grid-cols-2 gap-8 mt-10">
      <div className="rounded-md border p-4">
        <div className="flex gap-2">
          <Button className="flex gap-2" onClick={onGenerateTranscription}>
            Generate transcription <Bot />
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
