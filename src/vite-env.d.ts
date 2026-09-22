/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL do Web App do Apps Script. Ver apps-script/README.md. */
  readonly VITE_SHEETS_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
