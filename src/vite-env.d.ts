/// <reference types="vite/client" />

export type EnvVar = {
  VITE_NODE_ENV: 'development' | 'production';
  VITE_REACT_APP_API_PATH: string;
};

declare global {
  interface ImportMetaEnv extends EnvVar {}
}
