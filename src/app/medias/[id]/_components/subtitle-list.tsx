import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OpenaiVerboseJsonResponse } from '@/types/openai-verbose-json-response';
import { zodResolver } from '@hookform/resolvers/zod';
import { PaperclipIcon } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {
    subtitle: OpenaiVerboseJsonResponse;
    onAttachSubtitleToVideo: (data: OpenaiVerboseJsonResponse) => void;
    isLoadingAttachSub: boolean;
};

const UpdateSubtitleFormSchema = z.object({
    segments: z.array(
        z.object({
            id: z.number(),
            start: z.number(),
            end: z.number(),
            text: z.string(),
        })
    ),
});

type UpdateSubtitleForm = z.infer<typeof UpdateSubtitleFormSchema>;

export function SubtitleList({
    subtitle,
    onAttachSubtitleToVideo,
    isLoadingAttachSub,
}: Props) {
    const form = useForm<UpdateSubtitleForm>({
        resolver: zodResolver(UpdateSubtitleFormSchema),
        defaultValues: {
            segments: subtitle.segments,
        },
    });

    const { fields } = useFieldArray({
        control: form.control,
        name: 'segments',
    });

    function onUpdateSubtitle(data: UpdateSubtitleForm) {
        onAttachSubtitleToVideo({
            duration: subtitle.duration,
            text: subtitle.text,
            segments: data.segments,
        });
    }

    return (
        <form onSubmit={form.handleSubmit(onUpdateSubtitle)}>
            <div className="my-4 p-2 rounded-md bg-zinc-900/20">
                {fields.map(({ id, start, end, text }, index) => {
                    return (
                        <div
                            key={id}
                            className="border rounded flex flex-col m-5 p-2"
                        >
                            <span className="text-xs text-gray-300/70 truncate">
                                {start.toFixed(2)} - {end.toFixed(2)}
                            </span>
                            <Input
                                className="border-none bg-transparent outline-none"
                                {...form.register(
                                    `segments.${index}.text` as const
                                )}
                                defaultValue={text}
                                disabled
                            />
                        </div>
                    );
                })}
            </div>
            <Button
                type="submit"
                variant="secondary"
                disabled={isLoadingAttachSub}
            >
                Attach subtitle <PaperclipIcon className="ml-2" size={18} />
            </Button>
        </form>
    );
}
