import { useState, useEffect, useRef } from 'react';

const useTimer = (initialSeconds = 0, isActive = false) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(isActive);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, seconds]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = (newSeconds = initialSeconds) => {
    clearInterval(intervalRef.current);
    setSeconds(newSeconds);
    setIsRunning(false);
  };
  const setTime = (newSeconds) => setSeconds(newSeconds);

  return {
    seconds,
    isRunning,
    start,
    pause,
    reset,
    setTime,
    formattedTime: `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`
  };
};

export default useTimer;