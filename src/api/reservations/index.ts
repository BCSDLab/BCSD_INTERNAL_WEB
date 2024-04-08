import { accessClient } from 'api';
import { GetReservationsResponse, Reservations, PostReservationRequest } from 'model/reservations';

export const getReservations = () => accessClient.get<GetReservationsResponse[]>('/reservations');

export const postReservations = (data: PostReservationRequest) => accessClient.post('/reservations', data);

export const deleteReservations = (id: number) => accessClient.delete(`/reservations/${id}`);

export const putReservations = (id: number, data: Reservations) => accessClient.put(`/reservations/${id}`, data);

export const myReservation = () => accessClient.get<GetReservationsResponse[]>('reservations/member');
