import { accessClient } from "api";

export const getAllDues = async (year: number, track?: string) => {
  const response = await accessClient.get(`/dues?year=${year}&track=${track}`);
  return response;
}