export interface Dictionary<T = any> {
  [key: string]: T;
}

export type SortDirection = 'asc' | 'desc';

export type HttpErrorType = 'info' | 'warning' | 'error';

export interface HttpResponse<D = any> {
  data: D | null;
  message: string | null;
  messageCode: string | null;
  success: boolean;
  total: number;
}

export interface HttpErrorResponse {
  errors: string[];
  message: string | null;
  messageCode: string | null;
  type: HttpErrorType;
}

export interface PaginationParams {
  searchText: string;
  pageIndex: number;
  pageSize: number;
  sortBy?: string | null;
  sortDirection?: SortDirection | null;
}
