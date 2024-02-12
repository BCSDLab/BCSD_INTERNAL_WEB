export interface Pagination<T> {
  content: T[];
  hasNext: boolean;
  currentPage: number;
  totalElements: number;
  totalPage: number;
  pageSize: number;
}
