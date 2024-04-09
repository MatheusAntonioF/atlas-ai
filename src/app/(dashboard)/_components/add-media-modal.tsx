"use client";
import { VideoIcon } from "lucide-react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createMedia } from "@/server-actions/media/create-media";
import { DropzoneInput } from "./dropzone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateMedia, CreateMediaFormSchema } from "@/types/create-media-type";
import { LoadingIcon } from "@/assets/LoagingIcon";

type Props = {
  onCloseDialog: () => void;
};

export function AddMediaModal({ onCloseDialog }: Props) {
  const form = useForm<z.infer<typeof CreateMediaFormSchema>>({
    resolver: zodResolver(CreateMediaFormSchema),
    defaultValues: {
      video: undefined,
      language: "pt-BR",
    },
  });

  const onUploadVideo = async (data: CreateMedia) => {
    try {
      const formData = new FormData();

      formData.append("video", data.video);
      formData.append("language", data.language);

      /**
       * Sending a plain object to the server action caused an internal next error
       * Error: Only plain objects, and a few built-ins, can be passed to Server Actions. Classes or null prototypes are not supported.
       */
      await createMedia(formData);

      onCloseDialog();
    } catch (error) {
      toast.error(
        "An error occurred while uploading the video! Please try again"
      );
    }
  };

  return (
    <DialogContent className="flex flex-col p-4 items-center justify-start gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onUploadVideo)}
          className="w-full max-w-sm p-0"
        >
          <DialogHeader className="flex flex-col items-center gap-2 p-6">
            <VideoIcon className="h-10 w-10" />
            <DialogTitle>Upload Video</DialogTitle>
            <DialogDescription>
              Select a video from your device to upload
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 p-6">
            <div className="grid w-full gap-0.5">
              <FormField
                control={form.control}
                name="video"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <DropzoneInput
                        video={field.value}
                        onVideoUpload={field.onChange}
                      />
                    </FormControl>
                    <FormDescription className="text-center text-gray-500">
                      Support only .mp3 or .mp4 format.
                    </FormDescription>

                    <FormMessage>
                      {form.formState.errors.video?.message
                        ? String(form.formState.errors.video?.message)
                        : ""}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid w-full gap-0.5">
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Language..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pt-BR">Portuguese</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage>
                      {form.formState.errors.language?.message
                        ? String(form.formState.errors.language?.message)
                        : ""}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <DialogFooter className="flex p-6">
            <Button className="ml-auto">
              {form.formState.isSubmitting ? (
                <>
                  <LoadingIcon />
                  Processing...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
