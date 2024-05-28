import { notify } from 'shared/utils/notify';
import { ref, get, child } from 'firebase/database';
import { DB, DATABASE_MESSAGES_TABLE_NAME } from 'shared/firebase/constants/database';

type GetMessagesRequestProps = (messages: GMessage[]) => void;

export const GetMessagesRequest = (userId: GID, receiverId: GID, callback: GetMessagesRequestProps = () => {}) => {
    get(child(ref(DB), `${DATABASE_MESSAGES_TABLE_NAME}/`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const date = new Date();
                const updateTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                console.log(`%c>>> Messages Updated! ${updateTime}`, 'color: #0284c7');

                const messages = Object.entries(snapshot.val()).map(([key, value]) => ({
                    id: key,
                    ...value || {}
                })) as GMessage[];
                const filteredMessages = messages.filter((item) => item.userId === receiverId || item.userId === userId);

                callback(filteredMessages);
            }
        })
        .catch(() => notify.error({ message: "Error: Messages couldn't be updated." }));
};
