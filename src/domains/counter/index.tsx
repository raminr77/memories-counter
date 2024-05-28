import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CounterHeader } from "./counter-header";
import { CounterChatItem } from "./counter-chat-item";
import { ROUTES } from "../../shared/constants/routes";
import { animator } from "../../shared/utils/animator";
import { classnames } from "../../shared/utils/classnames";
import { userLogoutAction } from "../../shared/redux/user/user-slice";
import { userSelectors } from "../../shared/redux/user/user-selectors";
import { PostMessageRequest } from "../../shared/firebase/requests/post-message";
import { GetMessagesRequest } from "../../shared/firebase/requests/get-messages";

import AUDIO_FILE from '../../shared/assets/audio.mp3';
import LOVE_ANIMATION from '../../shared/assets/love-animation.json';

export function CounterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [text, setText] = useState<string>('');
    const { id, isAuthenticated } = useSelector(userSelectors.userInfo);

    const [items, setItems] = useState<GMessage[]>([]);

    const onSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const AUDIO = new Audio(AUDIO_FILE);
        AUDIO.play();
        
        const date = new Date();
        const created = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} | ${date.getHours()}:${date.getMinutes()}`;

        const message: GMessage = {
            text,
            created,
            id: null,
            userId: id
        };

        PostMessageRequest(message, (savedMessage) => {
            setItems([
                ...items,
                savedMessage
            ]);
            setText('');
        })
    };

    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(userLogoutAction());
            navigate(ROUTES.HOME);
        } else {
            GetMessagesRequest((messages) => setItems(messages || []));
        }
    }, [isAuthenticated]);

    return (
        <div className="w-full h-screen flex flex-col items-center">
            <CounterHeader />

            <section
                dir="rtl"
                style={{ height: 'calc(100vh - 60px)' }}
                className="w-full flex flex-col justify-end items-end px-5 pb-4 gap-2 z-10"
            >
                {items.map((item, index) => (
                    <CounterChatItem key={index} {...item} />
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
