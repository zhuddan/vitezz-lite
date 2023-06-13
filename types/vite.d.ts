/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_PORT: number;
  readonly VITE_APP_API_PREFIX: string;
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_STATIC_URL: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}
