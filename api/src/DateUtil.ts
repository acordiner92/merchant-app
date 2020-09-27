export const utcDate = (date: Date): Date =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60000);

export const getUtcDateNow = (): Date => utcDate(new Date());
