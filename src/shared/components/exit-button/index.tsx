import { useDispatch, useSelector } from 'react-redux';

import { notify } from 'shared/utils/notify';
import { classnames } from 'shared/utils/classnames';
import { userLogoutAction } from 'shared/redux/user/user-slice';
import { userSelectors } from 'shared/redux/user/user-selectors';

export function ExitButton({ className }: GCommonComponentProperties) {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(userSelectors.userInfo);
    const logoutHandler = () => {
        dispatch(userLogoutAction());
        notify.success({ message: 'Have Fun, Bye. 😎' });
    };


    return isAuthenticated && (
        <button
            type='button'
            onClick={logoutHandler}
            className={classnames('px-2 pb-2 pt-3 rounded-br-2xl rounded-bl-2xl bg-slate-200 dark:bg-slate-800', className)}
        >
            <img
                width={20}
                alt='Exit btn'
                src='/images/exit.png'
                className='dark:invert invert-0'
            />
        </button>
    );
}
