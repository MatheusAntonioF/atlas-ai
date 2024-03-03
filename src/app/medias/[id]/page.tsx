import { getMediaById } from "@/server-actions/media/get-media";
import { MediaInformation } from "./_components/media-information";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id: mediaId } }: Props) {
  const media = await getMediaById(mediaId);

  return (
    <div className="flex flex-col">
      <h2 className="scroll-m-20 my-2 text-3xl font-semibold tracking-tight">
        {media?.title || ""}
      </h2>
      <MediaInformation media={media} />
    </div>
  );
}
