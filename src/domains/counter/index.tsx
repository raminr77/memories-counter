import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CounterFooter } from "./counter-form";
import { CounterHeader } from "./counter-header";
import { CounterChatItem } from "./counter-chat-item";

import { ROUTES } from "shared/constants/routes";
import { animator } from "shared/utils/animator";
import { classnames } from "shared/utils/classnames";
import { userLogoutAction } from "shared/redux/user/user-slice";
import { userSelectors } from "shared/redux/user/user-selectors";
import { PostMessageRequest } from "shared/firebase/requests/post-message";
import { GetMessagesRequest } from "shared/firebase/requests/get-messages";

import LOVE_ANIMATION from 'shared/assets/love-animation.json';

import styles from './counter.module.scss';

export function CounterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [text, setText] = useState<string>('');
    const { id, receiverId, isAuthenticated } = useSelector(userSelectors.userInfo);

    const [items, setItems] = useState<GMessage[]>([]);

    const onSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!text.trim()) return;
        
        const date = new Date();
        const created = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} | ${date.getHours()}:${date.getMinutes()}`;

        const message: GMessage = {
            created,
            id: null,
            userId: id,
            receiverId,
            text: text.trim(),
        };

        PostMessageRequest(message, (savedMessage) => {
            setItems([
                ...items,
                savedMessage
            ]);
            setText('');
        });
    };

    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(userLogoutAction());
            navigate(ROUTES.HOME);
        } else {
            GetMessagesRequest(id, receiverId, (messages) => setItems(messages || []));
        }
    }, [isAuthenticated]);

    return (
        <div className="relative flex justify-center">
            <CounterHeader length={items.length} />

            <section
                dir="rtl"
                ref={(el) => el?.scrollTo(0, el.scrollHeight)}
                className={classnames(
                    "z-20 px-4 overflow-x-hidden h-screen overflow-y-auto w-11/12 flex flex-col pb-20 pt-44 gap-2",
                    styles['counter__hide-scrollbar'],
                    animator({ name: 'fadeIn', delay: '2s' })
                )}
            >
                {items.map((item, index) => (
                    <CounterChatItem key={index} {...item} />
                ))}
            </section>

            <CounterFooter text={text} onChange={setText} onSend={onSubmit} />

            <div
                style={{
                    height: 'calc(100vh - 60%)',
                    background: 'url("/images/city.png") no-repeat center',
                }}
                className="absolute bg-cover bottom-0 left-0 right-0 w-full z-10 dark:opacity-5 opacity-15"
            />
            <Lottie className='fixed bottom-16 z-0' animationData={LOVE_ANIMATION} />
        </div>
    );
}
