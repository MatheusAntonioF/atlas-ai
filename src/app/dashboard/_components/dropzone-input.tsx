"use client";

import { UploadIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  video: File | undefined;
  onVideoUpload: (file: File) => void;
};

export function DropzoneInput({ video, onVideoUpload }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const currentFile = acceptedFiles[0];
      if (currentFile) onVideoUpload(currentFile);
    },
    [onVideoUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "video/*": [],
    },
  });

  return (
    <div className="grid w-full gap-0.5 cursor-pointer" {...getRootProps()}>
      <div className="border border-dashed border-gray-500 rounded-md p-4">
        <div className="flex justify-center items-center h-32">
          {video ? (
            <p className="text-sm text-gray-500 text-center">
              {video.name} - {video.size / 1000000} MB
            </p>
          ) : isDragActive ? (
            <p className="text-sm text-gray-500 text-center">
              Drop the files here
            </p>
          ) : (
            <div className="flex flex-col gap-4 items-center">
              <UploadIcon size={28} />
              <p className="text-sm text-gray-500 text-center">
                Drag and drop your video here
              </p>
            </div>
          )}
        </div>

        <input {...getInputProps()} />
      </div>
    </div>
  );
}
