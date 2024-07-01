import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CALENDAR_ID } from 'ts/googleapi';
import { useSnackBar } from 'ts/useSnackBar';
import { useDateStore } from '../store/dateStore';

export const useDeleteEvent = () => {
  const snackBar = useSnackBar();
  const queryClient = useQueryClient();
  const { currentMonth, currentYear } = useDateStore();
  const { mutate } = useMutation({
    mutationFn: (eventId: string) => gapi.client.calendar.events.delete({
      eventId,
      calendarId: CALENDAR_ID,
    }),
    onSuccess: () => {
      snackBar({ type: 'success', message: '예약을 취소했습니다' });
      queryClient.invalidateQueries({ queryKey: ['calender', currentMonth, currentYear] });
    },
    onError: (e) => snackBar({ type: 'error', message: e.message }),
  });

  return { mutate };
};
