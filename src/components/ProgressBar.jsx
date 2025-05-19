import { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import '../styles/ProgressBar.css';

const ProgressBar = forwardRef((props, ref) => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  useImperativeHandle(ref, () => ({
    startProgress,
    stopProgress,
    resetProgress
  }));

  const startProgress = () => {
  if (intervalRef.current) return;

  setProgress(0);

  intervalRef.current = setInterval(() => {
    setProgress(prev => {
      if (prev >= 100) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        props.onComplete?.(); // Avisamos al padre que terminó
        return 100;
      }
      return prev + 1;
    });
  }, 600); // ⏱️ 1% cada 600ms → 100% en 60,000ms (1 minuto)
};

const stopProgress = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetProgress = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setProgress(0);
  };

  return (
    <div className="progress-container">
      <div className="progress-bar-background">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
});

export default ProgressBar;
