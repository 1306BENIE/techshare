const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const ENDPOINTS = {
  AUTH: {
    SIGNIN: `${BASE_URL}/auth/signin`,
    SIGNUP: `${BASE_URL}/auth/signup`,
    LOGOUT: `${BASE_URL}/auth/logout`,
  },
  USERS: {
    LIST: `${BASE_URL}/users`,
    DETAILS: (id: string) => `${BASE_URL}/users/${id}`,
    VERIFY: (id: string) => `${BASE_URL}/users/${id}/verify`,
  },
  TOOLS: {
    LIST: `${BASE_URL}/tools`,
    DETAILS: (id: string) => `${BASE_URL}/tools/${id}`,
    CREATE: `${BASE_URL}/tools`,
    UPDATE: (id: string) => `${BASE_URL}/tools/${id}`,
    DELETE: (id: string) => `${BASE_URL}/tools/${id}`,
  },
  BOOKINGS: {
    LIST: `${BASE_URL}/bookings`,
    CREATE: `${BASE_URL}/bookings`,
    UPDATE: (id: string) => `${BASE_URL}/bookings/${id}`,
    CANCEL: (id: string) => `${BASE_URL}/bookings/${id}/cancel`,
  },
} as const;
