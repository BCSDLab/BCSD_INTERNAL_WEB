export interface Reservations {
  memberCount: number;
  reason: string;
  detailedReason: string;
  startDateTime: string;
  endDateTime: string;
}

export interface GetReservationsResponse extends Reservations {
  id: number;
  memberName: string;
}
