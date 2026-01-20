import { format, isSameDay, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatDate = (date: Date | string, formatString = 'yyyy-MM-dd'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatString, { locale: ko });
};

export const formatDateTime = (date: Date | string): string => {
  return formatDate(date, 'yyyy-MM-dd HH:mm:ss');
};

export const isToday = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isSameDay(dateObj, new Date());
};

export const isSameDayAs = (date1: Date | string, date2: Date | string): boolean => {
  const dateObj1 = typeof date1 === 'string' ? parseISO(date1) : date1;
  const dateObj2 = typeof date2 === 'string' ? parseISO(date2) : date2;
  return isSameDay(dateObj1, dateObj2);
};
