"use server";

import { openai } from "@/lib/open-ai-api";

export async function processMediaWithAI(formData: FormData) {
    try {
        const mediaId = formData.get("mediaId") as string;

        const data = await makeTranscription(formData);
    } catch (error) {
        console.error("Error generating transcription - ", error);
        throw new Error("Error generating transcription");
    }
}

async function makeTranscription(formData: FormData) {
    try {
        console.log("starting openai transcription...");

        formData.append("model", "whisper-1");
        formData.append("response_format", "srt");

        const response = await openai.post("/audio/transcriptions", formData);

        console.log("🚀 ~ response:", response.data);
    } catch (error) {
        console.error("Error making transcription - ", error);
        throw new Error("Error making transcription");
    }
}
