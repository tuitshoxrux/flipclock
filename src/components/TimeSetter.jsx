import { useState, useEffect } from 'react';

const TimeSetter = ({ time, onTimeChange, isVisible }) => {
    const [inputTime, setInputTime] = useState(time);

    useEffect(() => {
        setInputTime(time);
    }, [time]);

    const handleInputChange = (unit, value) => {
        const numValue = parseInt(value) || 0;
        let newTime = { ...inputTime };

        switch (unit) {
            case 'hours':
                newTime.hours = Math.max(0, Math.min(23, numValue));
                break;
            case 'minutes':
                newTime.minutes = Math.max(0, Math.min(59, numValue));
                break;
            case 'seconds':
                newTime.seconds = Math.max(0, Math.min(59, numValue));
                break;
        }

        setInputTime(newTime);
    };

    const handleIncrement = (unit) => {
        let newTime = { ...inputTime };

        switch (unit) {
            case 'hours':
                newTime.hours = Math.min(23, newTime.hours + 1);
                break;
            case 'minutes':
                newTime.minutes = Math.min(59, newTime.minutes + 1);
                break;
            case 'seconds':
                newTime.seconds = Math.min(59, newTime.seconds + 1);
                break;
        }

        setInputTime(newTime);
    };

    const handleDecrement = (unit) => {
        let newTime = { ...inputTime };

        switch (unit) {
            case 'hours':
                newTime.hours = Math.max(0, newTime.hours - 1);
                break;
            case 'minutes':
                newTime.minutes = Math.max(0, newTime.minutes - 1);
                break;
            case 'seconds':
                newTime.seconds = Math.max(0, newTime.seconds - 1);
                break;
        }

        setInputTime(newTime);
    };

    const handleSetTime = () => {
        onTimeChange(inputTime);
    };

    const handlePresetTime = (minutes) => {
        const newTime = {
            hours: Math.floor(minutes / 60),
            minutes: minutes % 60,
            seconds: 0,
        };
        setInputTime(newTime);
        onTimeChange(newTime);
    };

    if (!isVisible) return null;

    return (
        <div className="time-setter">
            <div className="time-setter-header">
                <h3>Set Countdown Time</h3>
            </div>

            <div className="time-inputs">
                <div className="time-input-group">
                    <label>Hours</label>
                    <div className="input-controls">
                        <button
                            className="increment-btn"
                            onClick={() => handleIncrement('hours')}
                        >
                            +
                        </button>
                        <input
                            type="number"
                            min="0"
                            max="23"
                            value={inputTime.hours.toString().padStart(2, '0')}
                            onChange={(e) =>
                                handleInputChange('hours', e.target.value)
                            }
                        />
                        <button
                            className="decrement-btn"
                            onClick={() => handleDecrement('hours')}
                        >
                            -
                        </button>
                    </div>
                </div>

                <div className="time-input-group">
                    <label>Minutes</label>
                    <div className="input-controls">
                        <button
                            className="increment-btn"
                            onClick={() => handleIncrement('minutes')}
                        >
                            +
                        </button>
                        <input
                            type="number"
                            min="0"
                            max="59"
                            value={inputTime.minutes
                                .toString()
                                .padStart(2, '0')}
                            onChange={(e) =>
                                handleInputChange('minutes', e.target.value)
                            }
                        />
                        <button
                            className="decrement-btn"
                            onClick={() => handleDecrement('minutes')}
                        >
                            -
                        </button>
                    </div>
                </div>

                <div className="time-input-group">
                    <label>Seconds</label>
                    <div className="input-controls">
                        <button
                            className="increment-btn"
                            onClick={() => handleIncrement('seconds')}
                        >
                            +
                        </button>
                        <input
                            type="number"
                            min="0"
                            max="59"
                            value={inputTime.seconds
                                .toString()
                                .padStart(2, '0')}
                            onChange={(e) =>
                                handleInputChange('seconds', e.target.value)
                            }
                        />
                        <button
                            className="decrement-btn"
                            onClick={() => handleDecrement('seconds')}
                        >
                            -
                        </button>
                    </div>
                </div>
            </div>

            <div className="preset-buttons">
                <h4>Quick Presets</h4>
                <div className="preset-grid">
                    <button onClick={() => handlePresetTime(1)}>1 min</button>
                    <button onClick={() => handlePresetTime(5)}>5 min</button>
                    <button onClick={() => handlePresetTime(10)}>10 min</button>
                    <button onClick={() => handlePresetTime(15)}>15 min</button>
                    <button onClick={() => handlePresetTime(20)}>20 min</button>
                    <button onClick={() => handlePresetTime(25)}>25 min</button>
                    <button onClick={() => handlePresetTime(30)}>30 min</button>
                    <button onClick={() => handlePresetTime(60)}>1 hour</button>
                </div>
            </div>

            <div className="time-setter-actions">
                <button className="set-time-btn" onClick={handleSetTime}>
                    Set Time
                </button>
            </div>
        </div>
    );
};

export default TimeSetter;
