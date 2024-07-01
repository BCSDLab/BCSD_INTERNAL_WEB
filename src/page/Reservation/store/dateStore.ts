import { create } from 'zustand';

interface Date {
  currentMonth: number;
  currentYear: number;
  setCurrentMonth: (param: number) => void;
  setCurrentYear: (param: number) => void;
}

export const useDateStore = create<Date>((set) => ({
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  setCurrentMonth: (month: number) => set(() => ({ currentMonth: month })),
  setCurrentYear: (year: number) => set(() => ({ currentYear: year })),
}));
