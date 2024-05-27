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

export function CounterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [text, setText] = useState<string>('');
    const [time, setTime] = useState<string>('Loading ...');
    const { isAuthenticated } = useSelector(userSelectors.userInfo);
    const { startDate, startTime } = useSelector(appSelectors.appData);

    const [items, setItems] = useState<{ text: string; created: string; }[]>([]);

    const onSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const date = new Date();
        const created = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}  ${date.getHours()}:${date.getMinutes()}`;
        const message = { text, created };
        setItems([
            ...items,
            message
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
                "top-0 z-10 fixed w-full flex flex-col items-center justify-center shadow-md p-5 bg-white/20 dark:bg-black/20 backdrop-blur-sm",
                animator({ name: 'fadeInDown' })
            )}>
                <h1 className="tas-font text-2xl mt-4">The Memories 🩵</h1>
                <h3 className="text-app-color text-sm leading-8 mt-1">{time}</h3>
            </header>

            <section
                style={{ height: 'calc(100vh - 60px)' }}
                className="w-full flex flex-col justify-end items-end px-5 pb-4 gap-2"
            >
                {items.map(({ text, created }, index) => (
                    <div key={index} className={classnames(
                            'relative dark:bg-slate-700 bg-slate-200 rounded-l-xl rounded-tr-xl py-2 px-3 text-sm',
                            animator({ name: "bounceInRight" })
                        )}
                    >
                        <p>{text}</p>
                        <span className="text-xs opacity-40">{created}</span>
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
        </div>
    );
}
