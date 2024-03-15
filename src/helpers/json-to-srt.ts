import * as fs from "fs";

interface SubtitleItem {
    id: number;
    start: number;
    end: number;
    text: string;
}

export function jsonToSrt(jsonData: SubtitleItem[]): string {
    let srtContent = "";

    for (const item of jsonData) {
        const startTime = formatTime(item.start);
        const endTime = formatTime(item.end);

        const currentId = item.id + 1;

        srtContent += `${currentId}\n`;
        srtContent += `${startTime} --> ${endTime}\n`;
        srtContent += `${item.text}\n\n`;
    }

    return srtContent;
}

function formatTime(timeInSeconds: number): string {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const milliseconds = Math.floor(
        (timeInSeconds - Math.floor(timeInSeconds)) * 1000
    );

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)},${padZero(
        milliseconds,
        3
    )}`;
}

function padZero(num: number, length: number = 2): string {
    return num.toString().padStart(length, "0");
}
