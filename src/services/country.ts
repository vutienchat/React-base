import Endpoints from 'constants/endpoints';
import type { Country } from 'types/country';
import type { HttpResponse } from 'types/shared';
import HttpClient from 'utils/HttpClient';

// Get list countries
export const getCountries = async () => {
  return HttpClient.get<HttpResponse<Country[]>>(Endpoints.country.search);
};
