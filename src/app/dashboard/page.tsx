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
      <div className="mt-10">
        <MediaTable medias={medias} />
      </div>
    </>
  );
}
