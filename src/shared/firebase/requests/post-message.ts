import { notify } from 'shared/utils/notify';
import { ref, set, push, child } from 'firebase/database';
import { DB, DATABASE_MESSAGES_TABLE_NAME } from 'shared/firebase/constants/database';

export const PostMessageRequest = (messageData: GMessage, callback: (message: GMessage) => void = () => {}) => {
    const messageId: GID = push(child(ref(DB), DATABASE_MESSAGES_TABLE_NAME)).key;
    set(ref(DB, `${DATABASE_MESSAGES_TABLE_NAME}/${messageId}`), messageData)
        .then(() => {
            callback({
                ...messageData,
                id: messageId
            });
        })
        .catch(() => notify.error({ message: "Error: Your messages couldn't be saved." }));
};
