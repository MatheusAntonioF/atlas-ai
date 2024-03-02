import { Smile } from "lucide-react";
import { DialogMediaModal } from "./_components/dialog-media-modal";
import { MediaTable } from "./_components/media-table";
import { listMedia } from "@/server-actions/media/get-media";

export default async function Page() {
  const medias = await listMedia();
  console.log("🚀 ~ medias:", medias);

  return (
    <>
      <div className="flex items-center">
        <DialogMediaModal />
      </div>
      <div className="mt-10 w-full">
        {medias.length > 0 ? (
          <MediaTable medias={medias} />
        ) : (
          <div className="w-full text-center flex items-center justify-center gap-2">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Your medias will appear here
            </h2>
            <Smile />
          </div>
        )}
      </div>
    </>
  );
}
