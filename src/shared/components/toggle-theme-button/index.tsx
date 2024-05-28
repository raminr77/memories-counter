import { useDispatch, useSelector } from 'react-redux';

import { classnames } from 'shared/utils/classnames';
import { toggleDarkMode } from 'shared/redux/app/app-slice';
import { appSelectors } from 'shared/redux/app/app-selectors';

export function ToggleThemeButton({ className }: GCommonComponentProperties) {
    const dispatch = useDispatch();
    const { darkMode } = useSelector(appSelectors.appData);
    const toggleTheme = () => dispatch(toggleDarkMode(!darkMode));

    return (
        <button
            type='button'
            onClick={toggleTheme}
            className={classnames('px-2 pb-2 pt-3 rounded-br-2xl rounded-bl-2xl bg-slate-200 dark:bg-slate-800', className)}
        >
            <img
                width={20}
                className='invert'
                alt='Toggle theme btn'
                src={`/images/${darkMode ? 'sun' : 'moon'}.svg`}
            />
        </button>
    );
}
