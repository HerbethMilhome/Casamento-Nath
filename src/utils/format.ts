const MONTHS = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

/** '2026-11-20' → '20 de novembro de 2026' */
export const formatDateLong = (dateStr: string): string => {
  const [year, month, day] = (dateStr || '').split('-');
  const monthName = MONTHS[parseInt(month, 10) - 1];
  if (!year || !monthName || !day) return '20 de novembro de 2026';
  return `${parseInt(day, 10)} de ${monthName} de ${year}`;
};

/**
 * '16:00' → '16h', '17:30' → '17h30'.
 * Guests read "17h30", never "17:30h".
 */
export const formatHour = (timeStr: string): string => {
  const [hour, minute] = (timeStr || '').split(':');
  if (!hour) return timeStr || '';
  return minute && minute !== '00' ? `${parseInt(hour, 10)}h${minute}` : `${parseInt(hour, 10)}h`;
};

/** '2026-11-20' → '20.11.2026' (compact, for the navbar) */
export const formatDateNumeric = (dateStr: string): string => {
  const [year, month, day] = (dateStr || '').split('-');
  if (!year || !month || !day) return '20.11.2026';
  return `${day}.${month}.${year}`;
};
