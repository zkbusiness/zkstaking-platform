import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetUnixTime: number; // Unix timestamp in seconds
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetUnixTime }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Convert Unix time to milliseconds for calculations
  const targetTime = targetUnixTime * 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const delta = targetTime - currentTime;

      // If target time is in the past, stop the timer and set timeLeft to 0
      if (delta <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } else {
        setTimeLeft(delta);
      }
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [targetTime]);

  // Helper function to format the time
  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  };

  return (
    <div>
      <h2>Countdown Timer</h2>
      <p>{formatTime(timeLeft)}</p>
    </div>
  );
};

export default CountdownTimer;
