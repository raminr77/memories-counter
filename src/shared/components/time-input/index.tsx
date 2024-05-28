import { useEffect, useState } from "react";
import { Input } from "../input";

export function TimeInput({
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
    const [h, m, s] = (value || "").split(':');
    const [date, setDate] = useState({ h, m, s });

    useEffect(() => {
        const newValue = Object.values(date).join(':');
        onChange(newValue, name);
    }, [date]);

    return (
        <div className="flex flex-col my-2">
            <label className="mb-2 text-sm">{label}</label>
            <div className="flex items-center gap-2">
                <Input
                    min={24}
                    minLength={4}
                    maxLength={4}
                    value={date.h}
                    placeholder="HH"
                    onChange={(value) => setDate({ ...date, h: value })}
                />
                <Input
                    max={60}
                    minLength={2}
                    maxLength={2}
                    value={date.m}
                    placeholder="MM"
                    onChange={(value) => setDate({ ...date, m: value })}
                />
                <Input
                    max={60}
                    minLength={2}
                    maxLength={2}
                    value={date.s}
                    placeholder="SS"
                    onChange={(value) => setDate({ ...date, s: value })}
                />
            </div>
        </div>
    );
}
