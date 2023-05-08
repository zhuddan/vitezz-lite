export function useAppConfig() {
  const env = import.meta.env;
  return {
    VITE_APP_TITLE: env.VITE_APP_TITLE,
    VITE_APP_API_PREFIX: env.VITE_APP_API_PREFIX,
    VITE_APP_STATIC_URL: env.VITE_APP_STATIC_URL,
    VITE_APP_GEO_SERVER_URL: env.VITE_APP_GEO_SERVER_URL,
    VITE_APP_API_URL: env.VITE_APP_API_URL,
    VITE_APP_ONLY_OFFICE_URL: env.VITE_APP_ONLY_OFFICE_URL,
    VITE_APP_PORT: Number(env.VITE_APP_PORT),
    BASE_URL: env.BASE_URL,
    MODE: env.MODE,
    DEV: env.DEV,
    PROD: env.PROD,
    SSR: env.SSR,
  };
}
