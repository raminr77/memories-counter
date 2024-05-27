import { useDispatch, useSelector } from 'react-redux';

import { notify } from '../../utils/notify';
import { classnames } from '../../utils/classnames';
import { userSelectors } from '../../redux/user/user-selectors';
import { userLogoutAction } from '../../redux/user/user-slice';

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
