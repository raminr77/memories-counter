import { FormEvent } from "react";
import { classnames } from "shared/utils/classnames";

export function Button({
    label,
    onClick,
    disabled = false,
}: {
    label: string;
    disabled?: boolean;
    onClick: (event: FormEvent<HTMLButtonElement>) => void;
}){
    return (
        <button
          type="submit"
          onClick={onClick}
          disabled={disabled}
          className={classnames(
            "text-white outline-none tas-font text-sm transition-all rounded-md leading-10 py-1 w-full",
            {
              'opacity-30 bg-slate-500 dark:bg-slate-500': disabled,
              'bg-app-gradient-hover': !disabled
            }
          )}
        >
          {label}
        </button>
    );
}
