import { animator } from "shared/utils/animator";
import { classnames } from "shared/utils/classnames";

interface CounterChatItemProps {
    text: string;
    created: string;
    isLeft: boolean;
}

export function CounterChatItem({ text, created, isLeft }: CounterChatItemProps) {
    return (
        <div className={classnames(
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
    );
}
