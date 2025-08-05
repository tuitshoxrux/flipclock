// This file is no longer needed since we moved the timer logic to App.jsx
// You can delete this file or keep it for reference

import { useState, useEffect, useRef } from 'react';

const useTimer = (mode) => {
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (mode === 'countdown') {
            setTime({ hours: 0, minutes: 5, seconds: 0 });
        } else if (mode === 'stopwatch') {
            setTime({ hours: 0, minutes: 0, seconds: 0 });
        }
        setIsRunning(false);

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, [mode]);

    useEffect(() => {
        if (isRunning && (mode === 'countdown' || mode === 'stopwatch')) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => {
                    if (mode === 'countdown') {
                        let { hours, minutes, seconds } = prevTime;

                        if (seconds > 0) {
                            seconds--;
                        } else if (minutes > 0) {
                            seconds = 59;
                            minutes--;
                        } else if (hours > 0) {
                            seconds = 59;
                            minutes = 59;
                            hours--;
                        } else {
                            setIsRunning(false);
                            return { hours: 0, minutes: 0, seconds: 0 };
                        }

                        return { hours, minutes, seconds };
                    } else if (mode === 'stopwatch') {
                        let { hours, minutes, seconds } = prevTime;

                        seconds++;
                        if (seconds >= 60) {
                            seconds = 0;
                            minutes++;
                            if (minutes >= 60) {
                                minutes = 0;
                                hours++;
                                if (hours >= 24) {
                                    hours = 0;
                                }
                            }
                        }

                        return { hours, minutes, seconds };
                    }

                    return prevTime;
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, mode]);

    const start = () => setIsRunning(true);
    const pause = () => setIsRunning(false);
    const reset = () => {
        setIsRunning(false);
        if (mode === 'countdown') {
            setTime({ hours: 0, minutes: 5, seconds: 0 });
        } else if (mode === 'stopwatch') {
            setTime({ hours: 0, minutes: 0, seconds: 0 });
        }
    };

    return {
        time,
        isRunning,
        start,
        pause,
        reset,
        setTime,
    };
};

export default useTimer;
