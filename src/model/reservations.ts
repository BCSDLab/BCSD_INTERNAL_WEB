type Year = `${number}`;
type Month = `${number}`;
type Day = `${number}`;
type Hour = `${number}`;
type Minute = `${number}`;

export type DateTimeFormat = `${Year}-${Month}-${Day} ${Hour}:${Minute}`;

export interface Reservations {
  memberCount: number;
  reason: string;
  detailedReason: string;
  startDateTime: DateTimeFormat;
  endDateTime: DateTimeFormat;
}
