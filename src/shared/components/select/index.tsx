interface SelectProps extends GCommonComponentPropertiesWithChildren {
    label: string;
    onChange?: (value: string) => void
}

export function Select({
    label,
    children,
    onChange = () => {}
}: SelectProps){
    return (
        <div className="flex flex-col my-2 w-full">
            <label className="mb-2 text-sm">{label}</label>
            <select
                onChange={({ target }) => onChange(target.value)}
                className="h-11 border-2 tas-font rounded-md text-sm outline-none w-full leading-10 text-center bg-slate-100 duration-300 dark:bg-slate-600 border-slate-200 dark:border-slate-500 focus:border-slate-400 dark:focus:border-slate-300"
            >
                {children}
            </select>
        </div>
    );
}
