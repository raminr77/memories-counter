export {};

declare global {
  interface GMessage {
    text: string;
    created: string;
    userId: number | null;
  }
}
