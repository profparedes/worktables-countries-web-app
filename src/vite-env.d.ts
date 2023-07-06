/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME?: string
  readonly VITE_API_BASE_URL?: string
  readonly PACKAGE_VERSION: string
  // add more env variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
