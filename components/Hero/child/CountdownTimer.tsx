"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: string | Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const calculateTimeLeft = (now: number): TimeLeft => {
    const difference = new Date(targetDate).getTime() - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(Date.now()),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(Date.now()));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const items = [
    {
      label: "DAYS",
      value: String(timeLeft.days),
    },
    {
      label: "HOUR",
      value: String(timeLeft.hours).padStart(2, "0"),
    },
    {
      label: "MINUTES",
      value: String(timeLeft.minutes).padStart(2, "0"),
    },
    {
      label: "SECOND",
      value: String(timeLeft.seconds).padStart(2, "0"),
    },
  ];

  return (
    <>
      <div
        className="
          grid
          grid-cols-2
          lg:flex
          justify-center
          items-start
          gap-x-4
          gap-y-6
        "
      >
        {items.map((item, index) => (
          <div
            key={item.label}
            className="flex items-start justify-center gap-2 md:gap-4"
          >
            <div className="flex flex-col items-center">
              {/* DIGIT BOXES */}
              <div className="flex gap-2">
                {item.value.split("").map((digit, digitIndex) => (
                  <div
                    key={digitIndex}
                    className="
                      w-[52px] md:w-[64px] lg:w-[76px]
                      h-[74px] md:h-[92px] lg:h-[112px]
                      rounded-lg md:rounded-xl
                      bg-white
                      shadow-lg
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <span
                      className="
                        font-staatliches
                        text-[40px] md:text-[56px] lg:text-[72px]
                        leading-none
                        text-black
                      "
                    >
                      {digit}
                    </span>
                  </div>
                ))}
              </div>

              {/* LABEL */}
              <span
                className="
                  mt-2 md:mt-3
                  font-jakarata
                  text-[11px] md:text-sm lg:text-base
                  uppercase
                  tracking-wider
                  text-white/90
                "
              >
                {item.label}
              </span>
            </div>

            {/* SEPARATOR */}
            {index !== items.length - 1 && (
              <span
                className="
                  hidden lg:block
                  font-staatliches
                  text-white
                  text-[40px] md:text-[56px] lg:text-[72px]
                  leading-none
                  mt-2
                "
              >
                :
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="w-full text-center  font-staatliches text-[32px] text-white/80">
        Menuju{" "}
        <span className="font-staatliches bg-gradient-to-r from-teal to-gold bg-clip-text text-transparent">
          (Kegiatan Terdekat)
        </span>
      </p>
    </>
  );
}
