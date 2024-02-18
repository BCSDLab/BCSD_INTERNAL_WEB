export interface DuesInfo {
  year: number;
  dues: Dues[];
}

export interface Dues {
  memberId: number;
  name: string;
  track: TrackInfo;
  unpaidCount: number;
  detail: DuesDetail[];
}

export interface DuesDetail {
  month: number;
  status: 'PAID' | 'SKIP' | 'NOT_PAID' | null;
  memo?: string | null;
}

interface TrackInfo {
  id: number;
  name: string;
}

export const dummy: DuesInfo = {
  year: 2023,
  dues: [
    {
      memberId: 1,
      name: '채승윤',
      track: {
        id: 2,
        name: 'FRONTEND',
      },
      unpaidCount: 3,
      detail: [
        {
          month: 1,
          status: 'PAID',
          memo: null,
        },
        {
          month: 2,
          status: 'PAID',
          memo: null,
        },
        {
          month: 3,
          status: 'SKIP',
          memo: null,
        },
        {
          month: 4,
          status: 'SKIP',
          memo: null,
        },
        {
          month: 5,
          status: 'SKIP',
          memo: null,
        },
        {
          month: 6,
          status: 'SKIP',
          memo: null,
        },
        {
          month: 7,
          status: 'SKIP',
          memo: null,
        },
        {
          month: 8,
          status: 'SKIP',
          memo: null,
        },
        {
          month: 9,
          status: 'SKIP',
          memo: null,
        },
        {
          month: 10,
          status: 'SKIP',
          memo: null,
        },
        {
          month: 11,
          status: 'SKIP',
          memo: null,
        },
        {
          month: 12,
          status: null,
          memo: null,
        },
      ],
    },
    {
      memberId: 2,
      name: '정민구',
      track: {
        id: 1,
        name: 'FRONTEND',
      },
      unpaidCount: 0,
      detail: [
        {
          month: 1,
          status: null,
          memo: null,
        },
        {
          month: 2,
          status: null,
          memo: null,
        },
        {
          month: 3,
          status: null,
          memo: null,
        },
        {
          month: 4,
          status: null,
          memo: null,
        },
        {
          month: 5,
          status: null,
          memo: null,
        },
        {
          month: 6,
          status: null,
          memo: null,
        },
        {
          month: 7,
          status: null,
          memo: null,
        },
        {
          month: 8,
          status: null,
          memo: null,
        },
        {
          month: 9,
          status: null,
          memo: null,
        },
        {
          month: 10,
          status: null,
          memo: null,
        },
        {
          month: 11,
          status: null,
          memo: null,
        },
        {
          month: 12,
          status: null,
          memo: null,
        },
      ],
    },
    {
      memberId: 3,
      name: '정해성',
      track: {
        id: 1,
        name: 'FRONTEND',
      },
      unpaidCount: 0,
      detail: [
        {
          month: 1,
          status: null,
          memo: null,
        },
        {
          month: 2,
          status: null,
          memo: null,
        },
        {
          month: 3,
          status: null,
          memo: null,
        },
        {
          month: 4,
          status: null,
          memo: null,
        },
        {
          month: 5,
          status: null,
          memo: null,
        },
        {
          month: 6,
          status: null,
          memo: null,
        },
        {
          month: 7,
          status: null,
          memo: null,
        },
        {
          month: 8,
          status: null,
          memo: null,
        },
        {
          month: 9,
          status: null,
          memo: null,
        },
        {
          month: 10,
          status: null,
          memo: null,
        },
        {
          month: 11,
          status: null,
          memo: null,
        },
        {
          month: 12,
          status: null,
          memo: null,
        },
      ],
    },
  ],
};
