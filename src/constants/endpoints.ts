const Endpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refreshToken: '/auth/refreshToken',
  },
  user: {
    profile: '/user',
  },
  country: {
    search: '/country/list',
  },
  employee: {
    search: '/employee/search',
    detail: '/employee/get',
    create: '/employee/create',
    update: '/employee/update',
    delete: '/employee/delete',
    status: '/employee/status',
  },
} as const;

export default Endpoints;
