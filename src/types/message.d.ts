export {};

declare global {
  interface GMessage {
    text: string;
    created: string;
    id: null | string;
    userId: string | null;
  }
}
