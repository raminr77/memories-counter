import { useDispatch, useSelector } from 'react-redux';

import { classnames } from 'shared/utils/classnames';
import { toggleDarkMode } from 'shared/redux/app/app-slice';
import { appSelectors } from 'shared/redux/app/app-selectors';

export function ToggleThemeButton({ className }: GCommonComponentProperties) {
    const dispatch = useDispatch();
    const { darkMode } = useSelector(appSelectors.appData) as GApp;

    const updateBrowserColor = (isDarkMode: boolean) => {
        const color = isDarkMode ? '#1E2A3B' : '#F1F5F9';

        const themeColorTag: HTMLMetaElement | null = document.querySelector('meta[name="theme-color"]');
        const tileColorTag: HTMLMetaElement | null = document.querySelector('msapplication-TileColor');
        const navigationColor: HTMLMetaElement | null = document.querySelector('msapplication-navbutton-color');

        if (themeColorTag && tileColorTag && navigationColor) {
            themeColorTag.content = color;
            tileColorTag.content = color;
            navigationColor.content = color;
        }
    };

    const toggleTheme = () => {
        updateBrowserColor(darkMode);
        dispatch(toggleDarkMode(!darkMode));
    };

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
