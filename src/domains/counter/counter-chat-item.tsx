import { useSelector } from "react-redux";
import { animator } from "../../shared/utils/animator";
import { classnames } from "../../shared/utils/classnames";
import { userSelectors } from "../../shared/redux/user/user-selectors";

interface CounterChatItemProps extends GMessage {}

export function CounterChatItem({ text, created, userId }: CounterChatItemProps) {
    const { id: myId } = useSelector(userSelectors.userInfo);
    const isMineMessage = myId === userId;
    return (
        <div className={classnames(
            'w-full flex items-center',
            {
                'justify-end': !isMineMessage,
                'justify-start': isMineMessage
            }
        )}>
            <div className={classnames(
                    'relative max-w-full py-2 px-3 text-sm overflow-hidden',
                    {
                        'dark:bg-slate-700 bg-slate-200 rounded-r-xl rounded-tl-xl': !isMineMessage,
                        'dark:bg-slate-500 bg-slate-300 rounded-l-xl rounded-tr-xl': isMineMessage
                    },
                    animator({ name: isMineMessage ? "bounceInRight" : "bounceInLeft" })
                )}
            >
                <p className="whitespace-pre-line text-right leading-6">{text}</p>
                <span dir="ltr" className="text-xs mt-1 opacity-40">{created}</span>
            </div>
        </div>
    );
}
