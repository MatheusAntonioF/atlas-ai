export interface OpenaiVerboseJsonResponseSegment {
    id: number;
    seek?: number | undefined;
    start: number;
    end: number;
    text: string;
    tokens?: any[] | undefined;
    temperature?: number | undefined;
    avg_logprob?: number | undefined;
    compression_ratio?: number | undefined;
    no_speech_prob?: number | undefined;
}

export interface OpenaiVerboseJsonResponse {
    duration: number;
    text: string;
    segments: OpenaiVerboseJsonResponseSegment[];
}
