export const getLinkImageUrl = (
  url: string | undefined,
  width: number,
  height: number,
  quanlity = 100,
) => {
  return `${url}/${Math.floor(width)}/${Math.floor(height)}/${quanlity}`;
};
