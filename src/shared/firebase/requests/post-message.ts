import { notify } from '../../utils/notify';
import { ref, set } from 'firebase/database';
import { DB, DATABASE_MESSAGES_TABLE_NAME } from '../constants/database';

export const PostMessageRequest = (userId: string, data: any, callback = () => {}) => {
    set(ref(DB, `${DATABASE_MESSAGES_TABLE_NAME}/${userId}`), data)
        .then(callback)
        .catch(() => notify.error({ message: "Error: Your messages couldn't be saved." }));
};
