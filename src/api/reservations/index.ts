import { accessClient } from 'api';
import { Reservations } from 'model/reservations';

export const getReservations = () => accessClient.get<Reservations[]>('/reservations');

export const postReservations = (data: Reservations) => accessClient.post('/reservations', data);
