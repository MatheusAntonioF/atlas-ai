"use server";

import Openai from "openai";
import { env } from "@/lib/env";
import { OpenaiVerboseJsonResponse } from "@/types/openai-verbose-json-response";

export async function processMediaWithAI(formData: FormData) {
    try {
        const mediaId = formData.get("mediaId") as string;

        const subtitle = await generateSubtitle(formData);

        return subtitle;
    } catch (error) {
        console.error("Error generating transcription - ", error);
        throw new Error("Error generating transcription");
    }
}

async function generateSubtitle(formData: FormData) {
    try {
        console.log("starting openai transcription...");

        const openai = new Openai({
            apiKey: env.OPENAI_KEY,
            organization: env.OPENAI_ORGANIZATION,
        });

        const file = formData.get("file") as File;

        const response = await openai.audio.transcriptions.create({
            file: file,
            language: "en",
            response_format: "verbose_json",
            model: "whisper-1",
        });

        return response as OpenaiVerboseJsonResponse;
    } catch (error) {
        console.error("Error making transcription - ", error);
        throw new Error("Error making transcription");
    }
}
