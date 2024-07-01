import { useSuspenseQuery } from '@tanstack/react-query';
import { convertEventToReservation, initClient, listUpcomingEvents } from 'ts/googleapi';

const filterEventsByMonth = (events: gapi.client.calendar.Event[], currentMonth: number, currentYear: number) => {
  return events.filter((event) => {
    const eventDate = new Date(event.start?.dateTime || event.start?.date || '');
    return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
  });
};

interface Props {
  currentMonth: number;
  currentYear: number;
}

export const useGetCalender = ({ currentMonth, currentYear }: Props) => {
  const { data, isLoading } = useSuspenseQuery({
    queryKey: ['calender', currentMonth, currentYear],
    queryFn: async () => {
      await initClient();
      const response = await listUpcomingEvents(currentYear, currentMonth);
      return filterEventsByMonth(response, currentMonth, currentYear).map((event) => convertEventToReservation(event));
    },
  });

  return { data, isLoading };
};
