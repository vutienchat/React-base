import { useQuery } from '@tanstack/react-query';
import { getEmployee } from './services';

export const useEmployeeDetail = (props: { enabled: boolean; id?: string }) => {
  const { enabled, id } = props;

  const { data, isLoading } = useQuery(
    ['employee:detail', id],
    () => getEmployee(id || ''),
    {
      enabled: Boolean(enabled),
      select: (response) => response.data,
    }
  );

  return {
    employee: data || null,
    isLoading,
  };
};
