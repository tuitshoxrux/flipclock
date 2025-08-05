import { useState, useEffect } from 'react';
import FlipUnitContainer from './FlipUnitContainer';

const FlipClock = ({ mode, time: timerTime }) => {
    const [displayState, setDisplayState] = useState({
        hours: 0,
        hoursShuffle: true,
        minutes: 0,
        minutesShuffle: true,
        seconds: 0,
        secondsShuffle: true,
    });

    // Clock mode - update from current time
    useEffect(() => {
        if (mode !== 'clock') return;

        const updateClock = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            setDisplayState((prev) => {
                const newState = { ...prev };

                if (hours !== prev.hours) {
                    newState.hours = hours;
                    newState.hoursShuffle = !prev.hoursShuffle;
                }
                if (minutes !== prev.minutes) {
                    newState.minutes = minutes;
                    newState.minutesShuffle = !prev.minutesShuffle;
                }
                if (seconds !== prev.seconds) {
                    newState.seconds = seconds;
                    newState.secondsShuffle = !prev.secondsShuffle;
                }

                return newState;
            });
        };

        updateClock(); // Initial update
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, [mode]);

    // Timer modes - update from timer prop
    useEffect(() => {
        if (mode === 'clock' || !timerTime) return;

        const { hours, minutes, seconds } = timerTime;

        setDisplayState((prev) => {
            const newState = { ...prev };

            if (hours !== prev.hours) {
                newState.hours = hours;
                newState.hoursShuffle = !prev.hoursShuffle;
            }
            if (minutes !== prev.minutes) {
                newState.minutes = minutes;
                newState.minutesShuffle = !prev.minutesShuffle;
            }
            if (seconds !== prev.seconds) {
                newState.seconds = seconds;
                newState.secondsShuffle = !prev.secondsShuffle;
            }

            return newState;
        });
    }, [timerTime, mode]);

    return (
        <div className={'flipClock'}>
            <FlipUnitContainer
                unit={'hours'}
                digit={displayState.hours}
                shuffle={displayState.hoursShuffle}
            />
            <FlipUnitContainer
                unit={'minutes'}
                digit={displayState.minutes}
                shuffle={displayState.minutesShuffle}
            />
            (
            <FlipUnitContainer
                unit={'seconds'}
                digit={displayState.seconds}
                shuffle={displayState.secondsShuffle}
            />
            )
        </div>
    );
};

export default FlipClock;
