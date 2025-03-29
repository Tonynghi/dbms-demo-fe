import dayjs from 'dayjs';

const isoDateFormat = (
  dateString: string,
  format: string = 'DD/MM/YYYY',
): string => {
  return dayjs(dateString).format(format);
};

export default isoDateFormat;
