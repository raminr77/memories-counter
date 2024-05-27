import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../shared/constants/routes";
import { appSelectors } from "../../shared/redux/app/app-selectors";
import { userLogoutAction } from "../../shared/redux/user/user-slice";
import { userSelectors } from "../../shared/redux/user/user-selectors";
import { calculateTimeDifference } from "../../shared/utils/calculate-time-difference";

export function CounterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [time, setTime] = useState<string>('Loading ...');
    const { isAuthenticated } = useSelector(userSelectors.userInfo);
    const { startDate, startTime } = useSelector(appSelectors.appData);

    useEffect(() => {        
        if (!isAuthenticated) {
            dispatch(userLogoutAction());
            navigate(ROUTES.HOME);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const intervalId = (startDate && startTime) ? setInterval(() => {
            setTime(calculateTimeDifference(startDate, startTime));
        }, 1000) : undefined;
        return () => clearInterval(intervalId);
    }, [startDate, startTime]);

    return (
        <div className="w-full min-h-screen overflow-y-auto overflow-x-hidden">
            <header className="top-0 fixed w-full flex flex-col items-center justify-center shadow-md p-5 bg-white/20 dark:bg-black/20 backdrop-blur-sm">
                <h1 className="tas-font text-2xl mt-4">The Memories 🩵</h1>
                <h3 className="text-app-color text-sm leading-8 mt-1">{time}</h3>
            </header>
        </div>
    );
}
