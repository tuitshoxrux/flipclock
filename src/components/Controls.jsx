import { useState, useEffect } from 'react';

const Controls = ({
    mode,
    onModeChange,
    onFullscreen,
    onReset,
    onStartStop,
    isRunning,
    onShowTimeSetter,
    showTimeSetter,
}) => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () =>
            document.removeEventListener(
                'fullscreenchange',
                handleFullscreenChange
            );
    }, []);

    const handleStartStopClick = () => {
        console.log('Controls: Start/Stop button clicked');
        if (onStartStop) {
            onStartStop();
        }
    };

    const handleResetClick = () => {
        console.log('Controls: Reset button clicked');
        if (onReset) {
            onReset();
        }
    };

    const handleFullscreenClick = () => {
        console.log('Controls: Fullscreen button clicked');
        if (onFullscreen) {
            onFullscreen();
        }
    };

    const handleModeClick = (newMode) => {
        console.log('Controls: Mode button clicked:', newMode);
        if (onModeChange) {
            onModeChange(newMode);
        }
    };

    const handleTimeSetterClick = () => {
        console.log('Controls: Time setter button clicked');
        if (onShowTimeSetter) {
            onShowTimeSetter();
        }
    };

    return (
        <div className="controls">
            <div className="mode-selector">
                <button
                    className={mode === 'clock' ? 'active' : ''}
                    onClick={() => handleModeClick('clock')}
                >
                    Clock
                </button>
                <button
                    className={mode === 'countdown' ? 'active' : ''}
                    onClick={() => handleModeClick('countdown')}
                >
                    Countdown
                </button>
                <button
                    className={mode === 'stopwatch' ? 'active' : ''}
                    onClick={() => handleModeClick('stopwatch')}
                >
                    Stopwatch
                </button>
            </div>

            <div className="action-buttons">
                {mode === 'countdown' && (
                    <button
                        className="set-time-toggle"
                        onClick={handleTimeSetterClick}
                    >
                        {showTimeSetter ? 'Hide Settings' : 'Set Time'}
                    </button>
                )}

                {(mode === 'countdown' || mode === 'stopwatch') && (
                    <>
                        <button onClick={handleStartStopClick}>
                            {isRunning ? 'Pause' : 'Start'}
                        </button>
                        <button onClick={handleResetClick}>Reset</button>
                    </>
                )}
                <button onClick={handleFullscreenClick}>
                    {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                </button>
            </div>
        </div>
    );
};

export default Controls;
