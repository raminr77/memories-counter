import Lottie from "lottie-react";
import { useDispatch } from "react-redux";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { notify } from "shared/utils/notify";
import { Input } from "shared/components/input";
import { animator } from "shared/utils/animator";
import { ROUTES } from "shared/constants/routes";
import { Button } from "shared/components/button";
import { classnames } from "shared/utils/classnames";
import { LoginRequest } from "shared/firebase/requests/auth";
import { userLoginAction } from "shared/redux/user/user-slice";

import LOVE_ANIMATION from 'shared/assets/love-animation.json';

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
    if (isCodeValid(code)) {
      LoginRequest(code, (user: GUser) => {
        dispatch(userLoginAction(user));
        navigate(ROUTES.COUNTER);
      });
      return;
    }
    notify.error({ message: 'Oops, Your Code Pattern Is Not Correct!' });
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
        <h1
          className={classnames(
            "font-medium text-app-color text-3xl tas-font",
            animator({ name: 'fadeIn' })
          )}
        >
          Memories Counter
        </h1>
        <p
          className={classnames(
            "text-sm text-slate-600 dark:text-slate-300 tas-font mb-3",
            animator({ name: 'fadeIn' })
          )}
        >
          Your life is only as long as your good days.
        </p>

        <Input
          value={code}
          minLength={5}
          maxLength={10}
          type="password"
          placeholder="Enter Your Magic Code"
          onChange={(value) => setCode(value)}
        />

        <Button label="Submit" onClick={onSubmit} disabled={!isCodeValid(code)} />
      </form>

      <Lottie className='absolute bottom-0 z-0' animationData={LOVE_ANIMATION} />
    </div>
  )
}
