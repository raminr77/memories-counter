import { FormEvent } from "react";
import { animator } from "shared/utils/animator";
import { classnames } from "shared/utils/classnames";

interface CounterFooterProps {
    text: string;
    onChange: (value: string) => void;
    onSend: (event: FormEvent<HTMLButtonElement>) => void;
}
export function CounterFooter({ text = '', onChange = () => {}, onSend = () => {} }: CounterFooterProps){
    return (
        <form className={classnames(
            "z-30 bottom-5 gap-x-2 rounded fixed overflow-hidden w-11/12 flex items-end p-3 justify-center shadow-lg bg-white/50 dark:bg-black/20 backdrop-blur-sm",
            animator({ name: "fadeIn" })
        )}>
            <textarea
                rows={1}
                value={text}
                tabIndex={1}
                style={{ fieldSizing: 'content' }}
                placeholder="Send A Good Thing In Your Day..."
                onChange={({ target }) => onChange(target.value)}
                className="w-full text-sm leading-10 outline-none border-none indent-4 bg-transparent field-sizing-content"
            />
            <button
                type="submit"
                onClick={onSend}
                className="bg-app-gradient min-w-11 min-h-11 flex items-center justify-center rounded-full"
            >
                <img width={24} className="invert" alt="SEND" src="/images/send.png" />
            </button>
        </form>
    );
}
