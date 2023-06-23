import type {
  ColumnDef,
  SortingState,
  ColumnPinningState,
} from '@tanstack/react-table';

export type ProColumn<D, V = any> = ColumnDef<D, V>[];

export type DensitySeverity = 'default' | 'normal' | 'dense';

export type HeadAction =
  | 'hide'
  | 'pinLeft'
  | 'pinRight'
  | 'unpin'
  | 'unsort'
  | 'asc'
  | 'desc';

export type HeadCell<T> = {
  [Key in keyof T]?: string;
} & {
  index: string;
  actions: string;
  [key: string]: any;
};

export type ProTableSortingState = SortingState;

export interface TableKeyName {
  index: number;
  name: string;
}

export interface TableFormValues<T> {
  form: T[];
}

export interface ColumnPinning<T> extends ColumnPinningState {
  left?: (keyof T & string)[];
  right?: (keyof T & string)[];
}
