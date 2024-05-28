import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { animator } from "../../shared/utils/animator";
import { classnames } from "../../shared/utils/classnames";
import { appSelectors } from "../../shared/redux/app/app-selectors";
import { calculateTimeDifference } from "../../shared/utils/calculate-time-difference";

export function CounterHeader({ length = 0 }) {
    const [time, setTime] = useState<string>('Loading ...');
    const { startDate, startTime } = useSelector(appSelectors.appData);

    useEffect(() => {
        const intervalId = (startDate && startTime) ? setInterval(() => {
            setTime(calculateTimeDifference(startDate, startTime));
        }, 1000) : undefined;
        return () => clearInterval(intervalId);
    }, [startDate, startTime]);

    return (
        <header className={classnames(
            "top-0 z-20 fixed w-full flex flex-col items-center justify-center shadow-md p-5 bg-white/20 dark:bg-black/20 backdrop-blur-sm",
            animator({ name: 'fadeInDown' })
        )}>
            <h1 className="tas-font text-2xl mt-4">The Memories 🩵</h1>
            <h3 className="text-s mt-1">{`You have ${length} memories now.`}</h3>
            <h3 className="text-app-color text-sm leading-8 mt-1">{time}</h3>
        </header>
    );
}
