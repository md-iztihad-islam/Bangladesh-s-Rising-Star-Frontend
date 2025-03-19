import { useState, useEffect } from "react";

function CountDown() {
    const calculateTimeLeft = () => {
        const targetDate = new Date("April 11, 2025 00:00:00").getTime();
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [timeLeft]); // ✅ Dependency added

    return (
        <div className="flex justify-center">
            <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                {["days", "hours", "minutes", "seconds"].map((unit) => (
                    <div key={unit} className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                        <span className="countdown font-mono text-5xl">{timeLeft[unit]}</span>
                        {unit}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CountDown;
