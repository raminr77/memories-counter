import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";

import { ExitButton } from "../components/exit-button";
import { toggleDarkMode } from "../redux/app/app-slice";
import { appSelectors } from "../redux/app/app-selectors";
import { LOCAL_STORAGE_KEYS } from "../constants/local-storage-keys";
import { ToggleThemeButton } from "../components/toggle-theme-button";

export function Layout({ children }: GCommonComponentPropertiesWithChildren) {
  const dispatch = useDispatch();
  const { darkMode } = useSelector(appSelectors.appData);
  const toastStyle = {
    borderRadius: '8px',
    color: darkMode ? '#fff' : '#1e293b',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    background: darkMode ? '#475569' : '#e2e8f0'
  };


  useEffect(() => {
    const hasDarkMode = !!localStorage.getItem(LOCAL_STORAGE_KEYS.DARK_MODE);
    dispatch(toggleDarkMode(hasDarkMode));
  }, []);

  return (
    <main className='h-screen select-none flex flex-col w-full overflow-hidden bg-slate-100 dark:bg-slate-800 text-black dark:text-white relative'>
      <div className="absolute top-0 left-4 z-20 flex items-start justify-center gap-2">
          <ToggleThemeButton />
          <ExitButton />
      </div>

      {children}

      <Toaster
          position='top-center'
          toastOptions={{ className: 'select-none text-sm', style: toastStyle }}
      />
    </main>
  )
}
