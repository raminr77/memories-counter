import { useRef } from 'react';
import { useSelector } from 'react-redux';

import { notify } from 'shared/utils/notify';
import { userSelectors } from 'shared/redux/user/user-selectors';
import { RegisterFcmTokenRequest } from 'shared/firebase/requests/auth';
import { onMessageListener, requestNotificationPermission } from 'shared/firebase/requests/messaging';

export function AppNotification() {
  const isFirstLoad = useRef<boolean>(true);
  const userData = useSelector(userSelectors.userInfo);

  if (isFirstLoad.current) {
    requestNotificationPermission().then((token) => {
      if (token) {
        RegisterFcmTokenRequest(userData, token);
      }
    });

    onMessageListener().then(() => {
      notify.info({ message: 'You have a new message!' });
    });

    isFirstLoad.current = false;
  }

  return null;
}