export {};

declare global {
  interface GUser {
    name: string;
    code: string;
    email: string;
    isMale: boolean;
    startDate: string;
    startTime: string;
    birthday: stringl;
    id: null | string;
    isAuthenticated: boolean;
    receiverId: null | string;
  }
}
