export function getMediaUrlById(id: string, medias: any): string | undefined {
  const media = medias?.find((m: any) => m.id === id);
  return media ? media.url : undefined;
}
