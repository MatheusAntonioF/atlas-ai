export function getFileName(file: string) {
  return file.split(".").slice(0, -1).join(".");
}
