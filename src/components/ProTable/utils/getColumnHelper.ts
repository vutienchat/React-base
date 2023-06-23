import { createColumnHelper } from '@tanstack/react-table';

export const getColumnHelper = <T>() => createColumnHelper<T>();
