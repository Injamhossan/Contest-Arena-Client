import { useEffect, useState } from "react";

export function CountdownTimer({ deadline, compact = false }) {
  const calculateTimeLeft = () => {
    const difference = new Date(deadline).getTime() - new Date().getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  const isExpired = Object.values(timeLeft).every((v) => v === 0);

  if (isExpired) {
    return (
      <div className="text-red-500 font-semibold">
        Contest Ended
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2 font-display">
        <TimeBox value={timeLeft.days} label="D" compact />
        <span>:</span>
        <TimeBox value={timeLeft.hours} label="H" compact />
        <span>:</span>
        <TimeBox value={timeLeft.minutes} label="M" compact />
        <span>:</span>
        <TimeBox value={timeLeft.seconds} label="S" compact />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <TimeBox value={timeLeft.days} label="Days" />
      <TimeBox value={timeLeft.hours} label="Hours" />
      <TimeBox value={timeLeft.minutes} label="Minutes" />
      <TimeBox value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}

function TimeBox({ value, label, compact = false }) {
  if (compact) {
    return (
      <div className="flex items-center gap-1">
        <span className="font-bold text-sm">
          {value.toString().padStart(2, "0")}
        </span>
        <span className="text-xs text-gray-500">{label}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gray-100 border flex items-center justify-center">
        <span className="text-2xl md:text-3xl font-bold">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs md:text-sm text-gray-500 mt-2">
        {label}
      </span>
    </div>
  );
}
