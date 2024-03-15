import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

let ffmpeg = new FFmpeg();

export async function convertVideoToWav(fileUrl: string) {
    const fileName = `output_${new Date().valueOf()}`;

    try {
        await loadFfmpeg();

        await ffmpeg.writeFile(fileName, await fetchFile(fileUrl));

        ffmpeg.on("log", data => {
            console.log("ffmpeg log data:", data);
        });

        const outputFileName = `${fileName}.wav`;

        await ffmpeg.exec(["-i", fileName, "-ar", "16000", outputFileName]);

        const data = (await ffmpeg.readFile(outputFileName)) as Uint8Array;

        const convertedFileBlob = new Blob([data.buffer], {
            type: "video/wav",
        });

        const convertedFile = new File([convertedFileBlob], outputFileName, {
            type: convertedFileBlob.type,
        });

        return convertedFile;
    } catch (error) {
        console.error("Error converting video to wav - ", error);
    } finally {
        ffmpeg.deleteFile(fileName);
    }
}

export async function attachSubtitleToVideo(
    videoUrl: string,
    subtitleUrl: string
) {
    // -c:v copy and -c:a copy options are used to copy the video and audio streams without re-encoding them, which helps to preserve the original quality of the video and audio.
    // -c:s mov_text option is used to specify the subtitle codec. In this case, mov_text is used for .srt subtitle files.
    // -metadata:s:s:0 language=eng option is used to set the language metadata for the subtitles. Replace eng with the appropriate language code if your subtitles are in a different language.
    // ffmpeg -i assets/video.mp4 -i subtitle/subtitle.srt -c:v copy -c:a copy -c:s mov_text -metadata:s:s:0 language=eng video-with-subtitle.mp4

    const subtitleFileName = `subtitles_${new Date().valueOf()}`;
    const videoFileName = `video_${new Date().valueOf()}`;
    try {
        await loadFfmpeg();

        await ffmpeg.writeFile(subtitleFileName, await fetchFile(subtitleUrl));
        await ffmpeg.writeFile(videoFileName, await fetchFile(videoUrl));

        ffmpeg.on("log", data => {
            console.log("ffmpeg log data:", data);
        });

        const outputFileName = `video-with-subtitle.mp4`;

        await ffmpeg.exec([
            "-i",
            videoFileName,
            "-i",
            subtitleFileName,
            "-c:v",
            "copy",
            "-c:a",
            "copy",
            "-c:s",
            "mov_text",
            "-metadata:s:s:0",
            "language=eng",
            outputFileName,
        ]);

        const data = (await ffmpeg.readFile(outputFileName)) as Uint8Array;

        const convertedFileBlob = new Blob([data.buffer], {
            type: "video/mp4",
        });

        const convertedFile = new File([convertedFileBlob], outputFileName, {
            type: convertedFileBlob.type,
        });

        return convertedFile;
    } catch (error) {
        console.error("Error attaching subtitle to video - ", error);
    } finally {
        ffmpeg.deleteFile(videoFileName);
        ffmpeg.deleteFile(subtitleFileName);
    }
}

async function loadFfmpeg() {
    if (!ffmpeg.loaded) {
        const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";

        await ffmpeg.load({
            coreURL: await toBlobURL(
                `${baseURL}/ffmpeg-core.js`,
                "text/javascript"
            ),
            wasmURL: await toBlobURL(
                `${baseURL}/ffmpeg-core.wasm`,
                "application/wasm"
            ),
        });
    }
}
