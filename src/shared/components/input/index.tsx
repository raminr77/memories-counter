export function Input({
    min,
    max,
    name,
    value,
    minLength,
    maxLength,
    placeholder,
    type = "text",
    onChange = () => {}
}: {
    min?: number;
    max?: number;
    name?: string;
    value?: string;
    minLength?: number;
    maxLength?: number;
    placeholder?: string;
    type?: 'text' | 'number';
    onChange?: (value: string, name?: string) => void
}){
    return (
        <input
            min={min}
            max={max}
            name={name}
            type={type}
            value={value}
            minLength={minLength}
            maxLength={maxLength}
            placeholder={placeholder}
            onChange={({ target }) => onChange(target.value, target.name)}
            className="border-2 tas-font rounded-md text-sm outline-none w-full leading-10 text-center bg-slate-100 duration-300 dark:bg-slate-600 border-slate-200 dark:border-slate-500 focus:border-slate-400 dark:focus:border-slate-300"
        />
    );
}
