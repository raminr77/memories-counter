import { useDispatch, useSelector } from 'react-redux';

import { classnames } from '../../utils/classnames';
import { toggleDarkMode } from '../../redux/app/app-slice';
import { appSelectors } from '../../redux/app/app-selectors';

export function ToggleThemeButton({ className }: GCommonComponentProperties) {
    const dispatch = useDispatch();
    const { darkMode } = useSelector(appSelectors.appData);
    const toggleTheme = () => dispatch(toggleDarkMode(!darkMode));

    return (
        <button
            type='button'
            onClick={toggleTheme}
            className={classnames('p-2 rounded-full', className)}
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
