export const ROUTES = {
  HOME: "/",
  TOOLS: "/tools",
  TOOL_DETAILS: (id: string) => `/tools/${id}`,
  AUTH: {
    SIGNIN: "/auth/signin",
    SIGNUP: "/auth/signup",
  },
  BOOKINGS: "/bookings",
  PROFILE: "/profile",
} as const;
