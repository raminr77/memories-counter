export {};

declare global {
  interface GUser {
    name: string;
    code: string;
    email: string;
    isMale: boolean;
    birthday: stringl;
    id: null | string;
    isAuthenticated: boolean;
  }
}
