import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export async function convertVideoToWav(fileUrl: string) {
  const ffmpeg = new FFmpeg();

  if (!ffmpeg.loaded) {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
  }

  const fileName = "output";

  await ffmpeg.writeFile(fileName, await fetchFile(fileUrl));

  ffmpeg.on("log", data => {
    console.log("ffmpeg log data:", data);
  });

  const outputFileName = `${fileName}.wav`;

  await ffmpeg.exec(["-i", fileName, "-ar", "16000", outputFileName]);

  const data = (await ffmpeg.readFile(outputFileName)) as Uint8Array;

  const convertedFileBlob = new Blob([data.buffer], { type: "video/wav" });

  const convertedFile = new File([convertedFileBlob], outputFileName, {
    type: convertedFileBlob.type,
  });

  return convertedFile;
}
