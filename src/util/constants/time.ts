export const HOUR_LIST = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
export const MINUTE_LIST = ['00', '10', '20', '30', '40', '50'];

export const TIME_SLOT = HOUR_LIST.flatMap((hour) => MINUTE_LIST.map((minute) => `${hour}:${minute}`));
