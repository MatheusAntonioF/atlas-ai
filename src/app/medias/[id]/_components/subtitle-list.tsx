import { OpenaiVerboseJsonResponse } from "@/types/openai-verbose-json-response";

type Props = {
    subtitle: OpenaiVerboseJsonResponse;
};

export function SubtitleList({ subtitle }: Props) {
    return (
        <div className="my-4 p-2 rounded-md bg-zinc-900/20">
            {subtitle.segments.map(({ id, start, end, text }) => {
                return (
                    <div
                        key={id}
                        className="border rounded flex flex-col m-5 p-2"
                    >
                        <span className="text-xs text-gray-300/70">
                            {start.toFixed(2)} - {end.toFixed(2)}
                        </span>
                        <span>{text}</span>
                    </div>
                );
            })}
        </div>
    );
}
