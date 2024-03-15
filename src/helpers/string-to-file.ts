type Props = {
    content: string;
    fileName: string;
    fileType: string;
};

export function stringToFile({ content, fileName, fileType }: Props): File {
    const blob = new Blob([content], { type: fileType });
    return new File([blob], fileName, { type: fileType });
}
