export interface Pagination<T> {
  email?: string;
  content: T[];
  hasNext: boolean;
  currentPage: number;
  totalElements: number;
  totalPage: number;
  pageSize: number;
}
