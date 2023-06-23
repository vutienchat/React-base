import Endpoints from 'constants/endpoints';
import type { User } from 'types/profile';
import type { HttpResponse } from 'types/shared';
import HttpClient from 'utils/HttpClient';

// Sign in with email and password
interface SignInParams {
  userName: string;
  password: string;
}
interface SignInResponse {
  userId: number | null;
  accessToken: string | null;
  refreshToken: string | null;
}
export const signIn = async (params: SignInParams) => {
  return HttpClient.post<typeof params, SignInResponse>(
    Endpoints.auth.login,
    params
  );
};

// Sign out
export const signOut = async () => {
  return HttpClient.post(Endpoints.auth.logout);
};

// Get user profile
export const getUser = async () => {
  return HttpClient.get<HttpResponse<User>>(Endpoints.user.profile);
};
