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
  
  // Timer state
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  
  // Store start time and elapsed time for accuracy
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [countdownStartTime, setCountdownStartTime] = useState(null);
  const [initialCountdownTime, setInitialCountdownTime] = useState({ hours: 0, minutes: 5, seconds: 0 });

  // Initialize timer based on mode
  useEffect(() => {
    if (mode === 'countdown') {
      setTime({ hours: 0, minutes: 5, seconds: 0 });
      setInitialCountdownTime({ hours: 0, minutes: 5, seconds: 0 });
    } else if (mode === 'stopwatch') {
      setTime({ hours: 0, minutes: 0, seconds: 0 });
      setElapsedTime(0);
    }
    setIsRunning(false);
    setStartTime(null);
    setCountdownStartTime(null);
    setShowTimeSetter(false);
  }, [mode]);

  // Timer interval effect with precise timing
  useEffect(() => {
    let interval = null;

    if (isRunning && (mode === 'countdown' || mode === 'stopwatch')) {
      interval = setInterval(() => {
        const now = Date.now();
        
        if (mode === 'stopwatch') {
          if (startTime) {
            const totalElapsed = elapsedTime + (now - startTime);
            const totalSeconds = Math.floor(totalElapsed / 1000);
            
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            
            setTime({ hours, minutes, seconds });
          }
        } else if (mode === 'countdown') {
          if (countdownStartTime) {
            const elapsed = now - countdownStartTime;
            const initialTotalSeconds = 
              initialCountdownTime.hours * 3600 + 
              initialCountdownTime.minutes * 60 + 
              initialCountdownTime.seconds;
            
            const remainingSeconds = Math.max(0, initialTotalSeconds - Math.floor(elapsed / 1000));
            
            if (remainingSeconds <= 0) {
              setIsRunning(false);
              setTime({ hours: 0, minutes: 0, seconds: 0 });
              return;
            }
            
            const hours = Math.floor(remainingSeconds / 3600);
            const minutes = Math.floor((remainingSeconds % 3600) / 60);
            const seconds = remainingSeconds % 60;
            
            setTime({ hours, minutes, seconds });
          }
        }
      }, 100); // Update more frequently for smoother display
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, mode, startTime, elapsedTime, countdownStartTime, initialCountdownTime]);

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
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleModeChange = (newMode) => {
    console.log('Changing mode to:', newMode);
    setMode(newMode);
  };

  const handleStartStop = () => {
    console.log('Start/Stop clicked. Current isRunning:', isRunning);
    
    if (!isRunning) {
      // Starting timer
      const now = Date.now();
      
      if (mode === 'stopwatch') {
        setStartTime(now);
      } else if (mode === 'countdown') {
        setCountdownStartTime(now);
        setInitialCountdownTime({ ...time });
      }
      
      setIsRunning(true);
    } else {
      // Pausing timer
      if (mode === 'stopwatch' && startTime) {
        const now = Date.now();
        setElapsedTime(elapsedTime + (now - startTime));
        setStartTime(null);
      }
      
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    console.log('Reset clicked for mode:', mode);
    setIsRunning(false);
    setStartTime(null);
    setCountdownStartTime(null);
    setElapsedTime(0);
    
    if (mode === 'countdown') {
      setTime({ ...initialCountdownTime });
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
    setInitialCountdownTime(newTime);
    setShowTimeSetter(false);
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  return (
    <div className={`app ${isFullscreen ? 'fullscreen' : ''}`}>
      <Header mode={mode} />
      <FlipClock 
        mode={mode} 
        time={time}
      />
      
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