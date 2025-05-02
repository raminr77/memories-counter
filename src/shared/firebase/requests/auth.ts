import { notify } from 'shared/utils/notify';
import { ref, set, get, child, push } from 'firebase/database';
import { DB, DATABASE_USERS_TABLE_NAME } from 'shared/firebase/constants/database';

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
    const userId: GID = push(child(ref(DB), DATABASE_USERS_TABLE_NAME)).key;
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

export const RegisterFcmTokenRequest = (userData: UserDataType, token: string) => {
    set(ref(DB, `${DATABASE_USERS_TABLE_NAME}/${userData.id}`), {
        fcmToken: token,
        code: userData.code,
        name: userData.name,
        email: userData.email,
        isMale: userData.isMale,
        birthday: userData.birthday,
        startDate: userData.startDate,
        startTime: userData.startTime,
        receiverId: userData.receiverId,
        isAuthenticated: userData.isAuthenticated
    })
        .then(() => {
            console.log({ message: 'Your FCM Token saved successful.' });
        })
        .catch(() => notify.error({ message: 'Oops, You cannot save FCM Token now!' }));
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
