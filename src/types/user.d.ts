export {};

declare global {
  interface GUser {
    name: string;
    id: null | number;
    isAuthenticated: boolean;
  }
}
