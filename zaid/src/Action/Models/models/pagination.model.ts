export interface Pagination<T> {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    list: T;
  }
  