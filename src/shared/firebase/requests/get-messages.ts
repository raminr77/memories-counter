import { notify } from '../../utils/notify';
import { ref, get, child } from 'firebase/database';
import { DB, DATABASE_MESSAGES_TABLE_NAME } from '../constants/database';

type GetMessagesRequestProps = (messages: GMessage[]) => void;

export const GetMessagesRequest = (callback: GetMessagesRequestProps = () => {}) => {
    get(child(ref(DB), `${DATABASE_MESSAGES_TABLE_NAME}/`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log('>>> Messages Updated');
                callback(Object.values(snapshot.val()) as GMessage[]);
            }
        })
        .catch(() => notify.error({ message: "Error: Messages couldn't be updated." }));
};
