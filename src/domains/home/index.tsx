import Lottie from "lottie-react";
import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notify } from "../../shared/utils/notify";
import { animator } from "../../shared/utils/animator";
import { ROUTES } from "../../shared/constants/routes";
import { classnames } from "../../shared/utils/classnames";
import { userLoginAction } from "../../shared/redux/user/user-slice";

import LOVE_ANIMATION from '../../shared/assets/love-animation.json';

export function HomePage(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  const isCodeValid = (value: string): boolean => {
    if (!value || value.length < 5 || value.length > 10) {
      return false;
    }
    return true;
  };

  const onSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isCodeValid(code) && code === 'ramin') {
      // TODO: check code with BE
      notify.success({ message: 'Welcome! 😍' });
      dispatch(userLoginAction({}));
      navigate(ROUTES.COUNTER);
      return;
    }
    notify.error({ message: 'Oops, Your Code Is Wrong!' });
  };

  return (
    <div className='flex flex-col justify-center items-center relative w-full h-screen'>
      <form className={classnames(
        "w-11/12 z-10 flex flex-col items-center justify-center shadow-md rounded-md p-4 max-w-xs bg-slate-50 dark:bg-slate-700 gap-2",
        animator({ name: 'bounceIn' })
      )}>
        <img
          width={100}
          alt="Memories Counter"
          src="/images/logo.png"
          className={animator({ name: 'bounceIn' })}
        />
        <h1 className={classnames(
          "font-medium text-app-color text-3xl tas-font",
          animator({ name: 'fadeIn' })
        )}>Memories Counter</h1>
        <p className={classnames(
          "text-sm text-slate-600 dark:text-slate-300 tas-font",
          animator({ name: 'fadeIn' })
        )}>
          Your life is only as long as your good days.
        </p>
        
        <input
          type="text"
          value={code}
          minLength={5}
          maxLength={10}
          placeholder="Enter Your Magic Code"
          onChange={({ target }) => setCode(target.value)}
          className="border-2 tas-font rounded-md text-sm mt-3 outline-none w-full leading-10 text-center bg-slate-100 duration-300 dark:bg-slate-600 border-slate-200 dark:border-slate-500 focus:border-slate-400 dark:focus:border-slate-300"
        />
        <button
          type="submit"
          onClick={onSubmit}
          disabled={!isCodeValid(code)}
          className={classnames(
            "text-white outline-none tas-font text-sm transition-all rounded-md leading-10 py-1 w-full",
            {
              'opacity-30 bg-slate-500 dark:bg-slate-500': !isCodeValid(code),
              'bg-app-gradient-hover': isCodeValid(code)
            }
          )}
        >
          Submit
        </button>
      </form>

      <Lottie className='absolute bottom-0 z-0' animationData={LOVE_ANIMATION} />
    </div>
  )
}
