/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Optional POST endpoint for the /contact forms — a Formspree or Web3Forms
   * URL, or our own serverless function. When unset the forms fall back to
   * composing the message into the visitor's mail client.
   */
  readonly VITE_CONTACT_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
