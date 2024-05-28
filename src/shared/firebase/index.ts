import { notify } from 'shared/utils/notify';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { FIREBASE_CONFIGS } from 'shared/firebase/constants/firebase';

const FIREBASE_APP = initializeApp(FIREBASE_CONFIGS);

const AUTH = getAuth(FIREBASE_APP);

export const initFirebase = () => {
    signInAnonymously(AUTH)
        .then(() => {
            console.log('%cDB - SUCCESS!', 'color: green');
        })
        .catch(() => {
            notify.error({ message: "Error: We couldn't connect to the Database!" });
        });
}
