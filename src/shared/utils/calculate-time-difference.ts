export const calculateTimeDifference = (dateString: string, timeString: string): string => {
    const now = new Date();
    const targetDate = new Date(`${dateString}T${timeString}Z`);

    let delta = Math.abs(now.getTime() - targetDate.getTime()) / 1000;

    const years = Math.floor(delta / (365 * 24 * 60 * 60));
    delta -= years * 365 * 24 * 60 * 60;

    const days = Math.floor(delta / (24 * 60 * 60));
    delta -= days * 24 * 60 * 60;

    const hours = Math.floor(delta / (60 * 60));
    delta -= hours * 60 * 60;

    const minutes = Math.floor(delta / 60);
    delta -= minutes * 60;

    const seconds = Math.floor(delta);

    const result: string[] = [];
    if (years > 0) result.push(`${years} Years`);
    if (days > 0) result.push(`${days} Days`);
    if (hours > 0) result.push(`${hours} Hours`);
    if (minutes > 0) result.push(`${minutes} Minutes`);
    if (seconds > 0) result.push(`${seconds} Seconds`);

    return result.join(', ');
};
