export function getObjectKeyFromUrl(url: string) {
  return url.split("/").slice(-1)[0];
}
