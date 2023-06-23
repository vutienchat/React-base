import { useQuery } from '@tanstack/react-query';
import { getCountries } from 'services/country';

const useCountries = () => {
  const { data: countries } = useQuery(
    ['use:countries'],
    () => getCountries(),
    {
      enabled: true,
      select: (response) => response.data,
    }
  );

  return {
    countries: countries || [],
  };
};

export default useCountries;
