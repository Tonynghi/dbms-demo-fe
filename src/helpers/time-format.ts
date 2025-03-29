const timeFormat = (timeInSeconds: number): string => {
  const years = Math.floor(timeInSeconds / (365 * 24 * 60 * 60));
  timeInSeconds %= 365 * 24 * 60 * 60;

  const months = Math.floor(timeInSeconds / (30 * 24 * 60 * 60));
  timeInSeconds %= 30 * 24 * 60 * 60;

  const days = Math.floor(timeInSeconds / (24 * 60 * 60));
  timeInSeconds %= 24 * 60 * 60;

  const hours = Math.floor(timeInSeconds / (60 * 60));
  timeInSeconds %= 60 * 60;

  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  const parts = [];
  if (years) parts.push(`${years} năm`);
  if (months) parts.push(`${months} tháng`);
  if (days) parts.push(`${days} ngày`);
  if (hours) parts.push(`${hours} tiếng`);
  if (minutes) parts.push(`${minutes} phút`);
  if (seconds) parts.push(`${seconds} giây`);

  return parts.join(' ');
};

export default timeFormat;
