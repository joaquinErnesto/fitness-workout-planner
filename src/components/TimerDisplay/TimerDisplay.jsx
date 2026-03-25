import './TimerDisplay.css';

const TimerDisplay = ({ 
  totalTime, 
  exerciseTimes, 
  currentExerciseIndex, 
  currentSet,
  isWorkoutActive 
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-display">
      <div className="timer-main">
        <div className="total-timer">
          <div className="timer-label">TOTAL WORKOUT TIME</div>
          <div className="timer-value total-value">
            {formatTime(totalTime)}
          </div>
        </div>
        
        <div className="current-timer">
          <div className="timer-label">CURRENT STATUS</div>
          <div className="current-status">
            {isWorkoutActive ? (
              <>
                <div className="current-exercise">
                  <span className="status-label">Exercise:</span>
                  <span className="status-value">#{currentExerciseIndex + 1}</span>
                </div>
                <div className="current-set">
                  <span className="status-label">Set:</span>
                  <span className="status-value">{currentSet}</span>
                </div>
                <div className="current-time">
                  <span className="status-label">Remaining:</span>
                  <span className="status-value time-remaining">--:--</span>
                </div>
              </>
            ) : (
              <div className="workout-pending">
                <span className="pending-icon">⏳</span>
                <span>Workout Not Started</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="exercise-timers">
        <div className="timers-label">EXERCISE TIMES</div>
        <div className="timers-grid">
          {exerciseTimes.map((time, index) => (
            <div key={index} className={`exercise-timer ${currentExerciseIndex === index ? 'active' : ''}`}>
              <div className="exercise-timer-number">#{index + 1}</div>
              <div className="exercise-timer-time">{formatTime(time)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;