"use server";

import Openai from "openai";
import { prisma } from "@/lib/prisma";
import { env } from "@/lib/env";
import { OpenaiVerboseJsonResponse } from "@/types/openai-verbose-json-response";

export async function processMediaWithAI(formData: FormData) {
    try {
        const mediaId = formData.get("mediaId") as string;

        return OPENAI_MOCK_RESPONSE;

        // const subtitleUrl = await generateSubtitle(formData);

        // await prisma.media.update({
        //     where: { id: mediaId },
        //     data: { url_subtitle: subtitleUrl },
        // });
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

        const data = response as OpenaiVerboseJsonResponse;
    } catch (error) {
        console.error("Error making transcription - ", error);
        throw new Error("Error making transcription");
    }
}

const OPENAI_MOCK_RESPONSE: OpenaiVerboseJsonResponse = {
    duration: 20.780000686645508,
    text: "You know what we should all do? Go see a musical. Sure. And you know which one we should see? The 1996 Tony Award winner.",
    segments: [
        {
            id: 0,
            seek: 0,
            start: 0,
            end: 7.480000019073486,
            text: " You know what we should all do?",
            tokens: [],
            temperature: 0,
            avg_logprob: -0.4627838134765625,
            compression_ratio: 1.186274528503418,
            no_speech_prob: 0.027804430574178696,
        },
        {
            id: 1,
            seek: 0,
            start: 7.480000019073486,
            end: 10.880000114440918,
            text: " Go see a musical.",
            tokens: [],
            temperature: 0,
            avg_logprob: -0.4627838134765625,
            compression_ratio: 1.186274528503418,
            no_speech_prob: 0.027804430574178696,
        },
        {
            id: 2,
            seek: 0,
            start: 10.880000114440918,
            end: 13.119999885559082,
            text: " Sure.",
            tokens: [],
            temperature: 0,
            avg_logprob: -0.4627838134765625,
            compression_ratio: 1.186274528503418,
            no_speech_prob: 0.027804430574178696,
        },
        {
            id: 3,
            seek: 0,
            start: 13.119999885559082,
            end: 17.600000381469727,
            text: " And you know which one we should see?",
            tokens: [],
            temperature: 0,
            avg_logprob: -0.4627838134765625,
            compression_ratio: 1.186274528503418,
            no_speech_prob: 0.027804430574178696,
        },
        {
            id: 4,
            seek: 0,
            start: 17.600000381469727,
            end: 20.399999618530273,
            text: " The 1996 Tony Award winner.",
            tokens: [],
            temperature: 0,
            avg_logprob: -0.4627838134765625,
            compression_ratio: 1.186274528503418,
            no_speech_prob: 0.027804430574178696,
        },
    ],
};
