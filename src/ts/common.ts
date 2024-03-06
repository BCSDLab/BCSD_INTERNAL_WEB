export const formatPhoneNumber = (input: string) => {
  const numbers = input.replace(/[^\d]/g, '');
  if (numbers.length <= 3) {
    return numbers;
  } if (numbers.length <= 7) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  }
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
};
