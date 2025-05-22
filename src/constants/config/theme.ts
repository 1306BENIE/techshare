export const THEME = {
  COLORS: {
    PRIMARY: {
      DEFAULT: "#2563eb", // blue-600
      LIGHT: "#3b82f6", // blue-500
      DARK: "#1d4ed8", // blue-700
    },
    SECONDARY: {
      DEFAULT: "#64748b", // slate-500
      LIGHT: "#94a3b8", // slate-400
      DARK: "#475569", // slate-600
    },
    SUCCESS: "#22c55e", // green-500
    ERROR: "#ef4444", // red-500
    WARNING: "#f59e0b", // amber-500
    INFO: "#3b82f6", // blue-500
  },
  BREAKPOINTS: {
    SM: "640px",
    MD: "768px",
    LG: "1024px",
    XL: "1280px",
    "2XL": "1536px",
  },
  SPACING: {
    CONTAINER: {
      PADDING: "1rem",
      MAX_WIDTH: "1280px",
    },
  },
} as const;
