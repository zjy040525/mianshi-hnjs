import dayjs from 'dayjs/esm';

export const datetimeFormat = (
  date?: string | number | Date | dayjs.Dayjs | null | undefined,
) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};
