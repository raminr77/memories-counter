import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ROUTES } from "../../shared/constants/routes";
import { animator } from "../../shared/utils/animator";
import { classnames } from "../../shared/utils/classnames";
import { appSelectors } from "../../shared/redux/app/app-selectors";
import { userLogoutAction } from "../../shared/redux/user/user-slice";
import { userSelectors } from "../../shared/redux/user/user-selectors";
import { calculateTimeDifference } from "../../shared/utils/calculate-time-difference";

import LOVE_ANIMATION from '../../shared/assets/love-animation.json';

export function CounterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [text, setText] = useState<string>('');
    const [time, setTime] = useState<string>('Loading ...');
    const { isAuthenticated } = useSelector(userSelectors.userInfo);
    const { startDate, startTime } = useSelector(appSelectors.appData);

    const [items, setItems] = useState<{ text: string; isLeft: boolean; created: string; }[]>([]);

    const onSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const date = new Date();
        const created = `${date.getFullYear()} / ${date.getMonth()} / ${date.getDay()}  -  ${date.getHours()}:${date.getMinutes()}`;
        setItems([
            ...items,
            { text, isLeft: text === 'sss', created }
        ]);
        setText('');
    };

    useEffect(() => {        
        if (!isAuthenticated) {
            dispatch(userLogoutAction());
            navigate(ROUTES.HOME);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const intervalId = (startDate && startTime) ? setInterval(() => {
            setTime(calculateTimeDifference(startDate, startTime));
        }, 1000) : undefined;
        return () => clearInterval(intervalId);
    }, [startDate, startTime]);

    return (
        <div className="w-full min-h-screen overflow-y-auto flex flex-col items-center overflow-x-hidden">
            <header className={classnames(
                "top-0 z-20 fixed w-full flex flex-col items-center justify-center shadow-md p-5 bg-white/20 dark:bg-black/20 backdrop-blur-sm",
                animator({ name: 'fadeInDown' })
            )}>
                <h1 className="tas-font text-2xl mt-4">The Memories 🩵</h1>
                <h3 className="text-s mt-1">{`You have ${items.length} memories now.`}</h3>
                <h3 className="text-app-color text-sm leading-8 mt-1">{time}</h3>
            </header>

            <section
                dir="rtl"
                style={{ height: 'calc(100vh - 60px)' }}
                className="w-full flex flex-col justify-end items-end px-5 pb-4 gap-2 z-10"
            >
                {items.map(({ text, created, isLeft }, index) => (
                    <div key={index} className={classnames(
                        'w-full flex items-center',
                        {
                            'justify-end': isLeft,
                            'justify-start': !isLeft
                        }
                    )}>
                        <div className={classnames(
                                'relative max-w-full py-2 px-3 text-sm overflow-hidden',
                                {
                                    'dark:bg-slate-700 bg-slate-200 rounded-r-xl rounded-tl-xl': isLeft,
                                    'dark:bg-slate-500 bg-slate-300 rounded-l-xl rounded-tr-xl': !isLeft
                                },
                                animator({ name: isLeft ? "bounceInLeft" : "bounceInRight" })
                            )}
                        >
                            <p className="whitespace-pre-line text-right leading-6">{text}</p>
                            <span dir="ltr" className="text-xs mt-1 opacity-40">{created}</span>
                        </div>
                    </div>
                ))}
            </section>

            <form className={classnames(
                "bottom-5 gap-x-2 rounded-full fixed overflow-hidden w-11/12 flex items-center justify-center shadow-lg bg-white/50 dark:bg-black/20 backdrop-blur-sm",
                animator({ name: "fadeIn" })
            )}>
                <input
                    type="text"
                    value={text}
                    tabIndex={1}
                    placeholder="Send A Good Thing In Your Day..."
                    onChange={({ target }) => setText(target.value)}
                    className="w-full text-sm leading-10 outline-none border-none indent-4 bg-transparent"
                />
                <button
                    type="submit"
                    onClick={onSubmit}
                    className="bg-app-gradient min-w-11 min-h-11 flex items-center justify-center rounded-full"
                >
                    <img width={24} className="invert" alt="SEND" src="/images/send.png" />
                </button>
            </form>

            <Lottie className='absolute bottom-16 z-0' animationData={LOVE_ANIMATION} />
        </div>
    );
}
