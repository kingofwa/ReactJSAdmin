import moment from 'moment';

export function convertTimestampToDate(timestamp) {
  return timestamp ? moment.unix(timestamp).toDate() : null;
}

export const DATE_DEFAULT = 'YYYY/MM/DD';

export const DATE_DOT = 'YYYY.MM.DD';

export const DATE_LINE = 'YYYY-MM-DD';

export const DATE_NIHON = 'YYYY年MM月DD日';
