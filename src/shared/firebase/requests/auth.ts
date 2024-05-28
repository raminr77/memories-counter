import { notify } from '../../utils/notify';
import { ref, set, get, child, push } from 'firebase/database';
import { DB, DATABASE_USERS_TABLE_NAME } from '../constants/database';

type UserDataType = GUser;
type LoginCallbackType = (user: GUser) => void;

export const LoginRequest = (code: string, callback: LoginCallbackType = () => {}) => {
    get(child(ref(DB), `${DATABASE_USERS_TABLE_NAME}/`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const users = Object.entries(snapshot.val()).map(([key, value]) => ({
                    id: key,
                    ...value || {},
                    isAuthenticated: true
                })) as GUser[];
                const user = users.filter((item) => item.code === code);

                if (user.length) {
                    notify.success({ message: 'Welcome! 😍' });
                    callback(user[0]);
                } else {
                    notify.error({ message: 'Oops, Your Code Is Wrong!' });
                }
            }
        })
        .catch(() => notify.error({ message: 'Oops, Server Error!' }));
};

export const RegisterRequest = (userData: UserDataType, callback: LoginCallbackType = () => {}) => {
    const userId = push(child(ref(DB), DATABASE_USERS_TABLE_NAME)).key;
    set(ref(DB, `${DATABASE_USERS_TABLE_NAME}/${userId}`), userData)
        .then(() => {
            notify.success({ message: 'Your account created successful.' });
            callback({
                ...userData,
                id: userId,
                isAuthenticated: true
            });
        })
        .catch(() => notify.error({ message: 'Oops, You cannot create account now!' }));
};

export const GetUsersRequest = (callback: (users: GUser[]) => void = () => {}) => {
    get(child(ref(DB), `${DATABASE_USERS_TABLE_NAME}/`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const users = Object.entries(snapshot.val()).map(([key, value]) => ({
                    id: key,
                    ...value || {},
                    isAuthenticated: true
                })) as GUser[];
                callback(users);
            }
        })
        .catch(() => notify.error({ message: 'Oops, Server Error!' }));
};
