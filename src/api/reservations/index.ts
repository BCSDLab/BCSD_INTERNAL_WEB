import { accessClient } from 'api';
import { GetReservationsResponse, Reservations } from 'model/reservations';

export const getReservations = () => accessClient.get<GetReservationsResponse[]>('/reservations');

export const postReservations = (data: Reservations) => accessClient.post('/reservations', data);

export const deleteReservations = (id: number) => accessClient.delete(`/reservations/${id}`);

export const putReservations = (id: number, data: Reservations) => accessClient.put(`/reservations/${id}`, data);
