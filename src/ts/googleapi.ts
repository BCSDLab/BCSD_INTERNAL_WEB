import { GOOGLE_API_KEY, GOOGLE_CLIENT_ID } from 'config/constants';
import { Reservation } from 'model/reservations';
import { gapi } from 'gapi-script';
import { useSnackBar } from './useSnackBar';

const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

export const initClient = () => {
  return new Promise<void>((resolve, reject) => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: GOOGLE_API_KEY,
        clientId: GOOGLE_CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(() => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  });
};

export const signIn = () => {
  return gapi.auth2.getAuthInstance().signIn();
};

export const signOut = () => {
  return gapi.auth2.getAuthInstance().signOut();
};
const CALENDAR_ID = 'bcsdlab@gmail.com';
export const listUpcomingEvents = async (): Promise<gapi.client.calendar.Event[]> => {
  try {
    const response = await gapi.client.calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: (new Date()).toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 100,
      orderBy: 'startTime',
    });
    return response.result.items || [];
  } catch (error) {
    return [];
  }
};

export const createEvent = async (event: gapi.client.calendar.Event) => {
  try {
    const response = await gapi.client.calendar.events.insert({
      calendarId: CALENDAR_ID,
      resource: event,
    });
    return response.result;
  } catch (error) {
    return null;
  }
};

export const convertEventToReservation = (event: gapi.client.calendar.Event): Reservation => {
  return {
    memberCount: event.attendees?.length || 0,
    reason: event.summary || '-',
    detailedReason: event.description || '-',
    startDateTime: event.start?.dateTime || '',
    endDateTime: event.end?.dateTime || '',
    memberName: event.organizer?.displayName || event.organizer?.email || '-',
  };
};

export const convertReservationToEvent = (reservation: Reservation): gapi.client.calendar.Event => {
  const startDate = new Date(reservation.startDateTime);
  const endDate = new Date(reservation.endDateTime);
  return {
    summary: reservation.reason,
    description: reservation.detailedReason,
    start: {
      dateTime: startDate.toISOString(),
      timeZone: 'Asia/Seoul',
    },
    end: {
      dateTime: endDate.toISOString(),
      timeZone: 'Asia/Seoul',
    },
    attendees: reservation.memberCount ? [{ email: reservation.memberName }] : [],
  };
};
