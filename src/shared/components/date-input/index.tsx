import { useEffect, useState } from "react";
import { Input } from "../input";

export function DateInput({
    value,
    label,
    name,
    onChange = () => {}
}: {
    name?: string;
    value?: string;
    label?: string;
    onChange?: (value: string, name?: string) => void
}){
    const [year, month, day] = (value || "").split('-');
    const [date, setDate] = useState({ year, month, day });

    useEffect(() => {
        const newValue = Object.values(date).join('-');
        onChange(newValue, name);
    }, [date]);

    return (
        <div className="flex flex-col mt-1">
            <label className="mb-2 text-sm tas-font">{label}</label>
            <div className="flex items-center gap-2">
                <Input
                    min={1950}
                    minLength={4}
                    maxLength={4}
                    value={date.year}
                    placeholder="Year"
                    onChange={(value) => setDate({ ...date, year: value })}
                />
                <Input
                    max={12}
                    minLength={2}
                    maxLength={2}
                    value={date.month}
                    placeholder="Month"
                    onChange={(value) => setDate({ ...date, month: value })}
                />
                <Input
                    max={31}
                    minLength={2}
                    maxLength={2}
                    value={date.day}
                    placeholder="Day"
                    onChange={(value) => setDate({ ...date, day: value })}
                />
            </div>
        </div>
    );
}
