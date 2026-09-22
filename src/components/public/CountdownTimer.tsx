import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDateStr: string; // YYYY-MM-DD
  targetTimeStr: string; // HH:MM
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDateStr, targetTimeStr }) => {
  const calculateTimeLeft = (): TimeLeft => {
    try {
      const target = new Date(`${targetDateStr}T${targetTimeStr || '16:00'}:00`);
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return { days, hours, minutes, seconds, isPast: false };
    } catch {
      return { days: 125, hours: 14, minutes: 32, seconds: 40, isPast: false };
    }
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDateStr, targetTimeStr]);

  if (timeLeft.isPast) {
    return (
      <div className="glass px-6 py-4 rounded-2xl inline-flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#8C7355] animate-ping" />
        <span className="font-serif text-lg text-[#2A2623]">O grande dia chegou! Celebrem conosco!</span>
      </div>
    );
  }

  const items = [
    { label: 'Dias', value: timeLeft.days },
    { label: 'Horas', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'Minutos', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'Segundos', value: String(timeLeft.seconds).padStart(2, '0') },
  ];

  return (
    <div className="flex items-center justify-center gap-2.5 sm:gap-4 flex-wrap">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="glass rounded-2xl px-3 sm:px-5 py-3 sm:py-4 flex flex-col items-center min-w-[70px] sm:min-w-[84px] shadow-sm hover:translate-y-[-2px] transition-transform"
        >
          <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2A2623] font-light leading-none">
            {item.value}
          </span>
          <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#8C7355] font-medium mt-1.5 opacity-80">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
