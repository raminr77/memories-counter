import { FormEvent, useEffect, useState } from "react";
import { Input } from "shared/components/input";
import { ROUTES } from "shared/constants/routes";
import { animator } from "shared/utils/animator";
import { Button } from "shared/components/button";
import { Select } from "shared/components/select";
import { classnames } from "shared/utils/classnames";
import { DateInput } from "shared/components/date-input";
import { TimeInput } from "shared/components/time-input";
import { GetUsersRequest } from "shared/firebase/requests/auth";

export function RegisterPage() {
    const [receviers, setReceivers] = useState<GUser[]>([]);
    const [userData, setUserData] = useState<GUser>({
        id: null,
        name: '',
        code: '',
        email: '',
        isMale: true,
        birthday: '',
        startDate: '',
        startTime: '',
        receiverId: null,
        isAuthenticated: true
    });

    const onSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('Submit', userData);
    };

    const onValueChange = (value: string, name?: string) => {
        if (!name) return;
        setUserData({ ...userData, [name]: value })
    };

    useEffect(() => {
        GetUsersRequest((users) => setReceivers(users));
    }, []);

    return (
        <div className='flex flex-col justify-center items-center overflow-hidden h-screen'>
            <img
                width={100}
                alt="Memories Counter"
                src="/images/logo.png"
                className={animator({ name: 'bounceIn' })}
            />
            <h1 
                className={classnames(
                    "font-medium text-app-color text-xl tas-font mb-3",
                    animator({ name: 'fadeIn' })
                )}
            >
                Join To Memories Counter
            </h1>
            <div className="w-full flex flex-col items-center justify-center shadow-md rounded-md p-4 max-w-xs bg-slate-50 dark:bg-slate-700 gap-2 h-96 overflow-y-auto">
                <Input
                    name="name"
                    placeholder="Name"
                    value={userData.name}
                    onChange={onValueChange}
                />
                <Input
                    name="code"
                    placeholder="Code"
                    value={userData.code}
                    onChange={onValueChange}
                />
                <Input
                    name="email"
                    value={userData.email}
                    onChange={onValueChange}
                    placeholder="Email Address"
                />
                
                <DateInput
                    name="birthday"
                    label="Birthday"
                    onChange={onValueChange}
                    value={userData.birthday}
                />
                
                <DateInput
                    name="startDate"
                    label="Start Date"
                    onChange={onValueChange}
                    value={userData.startDate}
                />

                <TimeInput
                    name="startTime"
                    label="Start Time"
                    onChange={onValueChange}
                    value={userData.startTime}
                />

                <Select label="Select Your Sex" onChange={(value) => setUserData({ ...userData, isMale: !!Number(value) })}>
                    <option value={1}>Male</option>
                    <option value={0}>Famale</option>
                </Select>


                <Select label="Select Your Receiver" onChange={(receiverId) => setUserData({ ...userData, receiverId })}>
                    {receviers.map(({ id, name }) => (
                        <option key={id} value={id || ''}>{name}</option>
                    ))}
                </Select>
            </div>
            <div className="max-w-xs w-full mt-3 flex flex-col gap-2 items-center justify-center">
                <Button label="REGISTER" onClick={onSubmit} />
                <a href={ROUTES.HOME} className="tas-font text-sm bg-slate-50 dark:bg-slate-700 leading-8 w-full text-center py-1 rounded-md">Home Page</a>
            </div>
        </div>
    );
}
