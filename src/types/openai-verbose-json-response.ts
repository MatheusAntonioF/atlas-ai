export interface OpenaiVerboseJsonResponseSegment {
    id: number;
    seek: number;
    start: number;
    end: number;
    text: string;
    tokens: any[];
    temperature: number;
    avg_logprob: number;
    compression_ratio: number;
    no_speech_prob: number;
}

export interface OpenaiVerboseJsonResponse {
    duration: number;
    text: string;
    segments: OpenaiVerboseJsonResponseSegment[];
}
