import { getDatabase } from "firebase/database";

export const DATABASE_USERS_TABLE_NAME = 'USERS';
export const DATABASE_MESSAGES_TABLE_NAME = 'MESSAGES';

export const DB = getDatabase();
