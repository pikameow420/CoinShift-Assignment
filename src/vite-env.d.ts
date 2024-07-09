/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_ONRAMPER: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }