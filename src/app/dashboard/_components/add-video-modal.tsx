"use client";
import { useState } from "react";
import { VideoIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DropzoneInput } from "./dropzone-input";
import { toast } from "sonner";
import { uploadVideo } from "@/server-actions/upload-video";

export default function AddVideoModal() {
  const [video, setVideo] = useState<File>();

  const onUploadVideo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!video) return toast.error("No video selected");

    const formData = new FormData();

    formData.append("video", video);

    await uploadVideo(formData);
  };

  const onVideoUpload = (file: File) => {
    setVideo(file);
  };

  return (
    <DialogContent className="flex flex-col p-4 items-center justify-start gap-4">
      <form onSubmit={onUploadVideo} className="w-full max-w-sm p-0">
        <DialogHeader className="flex flex-col items-center gap-2 p-6">
          <VideoIcon className="h-10 w-10" />
          <DialogTitle>Upload Video</DialogTitle>
          <DialogDescription>
            Select a video from your device to upload
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 p-6">
          <div className="grid w-full gap-0.5">
            <DropzoneInput video={video} onVideoUpload={onVideoUpload} />
          </div>
        </div>
        <DialogFooter className="flex p-6">
          <Button className="ml-auto" disabled={!video}>
            Submit
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
