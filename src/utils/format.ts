import * as dayjs from 'dayjs';

export const datetimeFormat = (
  date?: string | number | Date | dayjs.Dayjs | null | undefined,
) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};
