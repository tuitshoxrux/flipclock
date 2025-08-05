import { useState, useEffect } from 'react';
import Header from './components/Header';
import FlipClock from './components/FlipClock';
import Controls from './components/Controls';
import TimeSetter from './components/TimeSetter';
import './App.css';

function App() {
    const [mode, setMode] = useState('clock');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showTimeSetter, setShowTimeSetter] = useState(false);
    const [showSeconds, setShowSeconds] = useState(true);

    // Timer state
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [isRunning, setIsRunning] = useState(false);

    // Initialize timer based on mode
    useEffect(() => {
        if (mode === 'countdown') {
            setTime({ hours: 0, minutes: 5, seconds: 0 });
        } else if (mode === 'stopwatch') {
            setTime({ hours: 0, minutes: 0, seconds: 0 });
        }
        setIsRunning(false);
        setShowTimeSetter(false); // Hide time setter when switching modes
    }, [mode]);

    // Timer interval effect
    useEffect(() => {
        let interval = null;

        if (isRunning && (mode === 'countdown' || mode === 'stopwatch')) {
            interval = setInterval(() => {
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
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning, mode]);

    // Fullscreen handlers
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        const handleKeyPress = (e) => {
            if (e.key === 'Escape' && document.fullscreenElement) {
                document.exitFullscreen();
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener(
                'fullscreenchange',
                handleFullscreenChange
            );
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const handleModeChange = (newMode) => {
        console.log('Changing mode to:', newMode);
        setMode(newMode);
    };

    const handleStartStop = () => {
        console.log('Start/Stop clicked. Current isRunning:', isRunning);
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        console.log('Reset clicked for mode:', mode);
        setIsRunning(false);
        if (mode === 'countdown') {
            setTime({ hours: 0, minutes: 5, seconds: 0 });
        } else if (mode === 'stopwatch') {
            setTime({ hours: 0, minutes: 0, seconds: 0 });
        }
    };

    const handleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const handleShowTimeSetter = () => {
        setShowTimeSetter(!showTimeSetter);
    };

    const handleTimeChange = (newTime) => {
        console.log('Time changed to:', newTime);
        setTime(newTime);
        setShowTimeSetter(false); // Hide time setter after setting time
    };

    const exitFullscreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    };

    return (
        <div className={`app ${isFullscreen ? 'fullscreen' : ''}`}>
            <Header mode={mode} />
            <FlipClock mode={mode} time={time} showSeconds={showSeconds} />

            {mode === 'countdown' && showTimeSetter && (
                <TimeSetter
                    time={time}
                    onTimeChange={handleTimeChange}
                    isVisible={showTimeSetter}
                />
            )}

            <Controls
                mode={mode}
                onModeChange={handleModeChange}
                onFullscreen={handleFullscreen}
                onReset={handleReset}
                onStartStop={handleStartStop}
                isRunning={isRunning}
                onShowTimeSetter={handleShowTimeSetter}
                showTimeSetter={showTimeSetter}
            />

            {isFullscreen && (
                <div className="fullscreen-hint" onClick={exitFullscreen}>
                    Press ESC or click here to exit fullscreen
                </div>
            )}
        </div>
    );
}

export default App;
