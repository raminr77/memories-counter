import { notify } from '../../utils/notify';
import { ref, get, child } from 'firebase/database';
import { DB, DATABASE_MESSAGES_TABLE_NAME } from '../constants/database';

type GetMessagesRequestProps = (messages: GMessage[]) => void;

export const GetMessagesRequest = (userId: string | null, receiverId: string | null, callback: GetMessagesRequestProps = () => {}) => {
    get(child(ref(DB), `${DATABASE_MESSAGES_TABLE_NAME}/`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log('>>> Messages Updated');
                const messages = Object.entries(snapshot.val()).map(([key, value]) => ({
                    id: key,
                    ...value || {}
                })) as GMessage[];
                const filteredMessages = messages.filter((item) => (item.receiverId === receiverId || item.userId === userId));

                callback(filteredMessages);
            }
        })
        .catch(() => notify.error({ message: "Error: Messages couldn't be updated." }));
};
