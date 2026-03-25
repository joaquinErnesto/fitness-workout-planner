import './TimerControls.css';

const TimerControls = ({ 
  isWorkoutActive, 
  onStart, 
  onReset,
  exercises,
  currentExerciseIndex,
  currentSet,
  onExerciseChange,
  onSetChange
}) => {
  const handleNext = () => {
    if (currentSet < exercises[currentExerciseIndex]?.sets) {
      onSetChange(currentSet + 1);
    } else if (currentExerciseIndex < exercises.length - 1) {
      onExerciseChange(currentExerciseIndex + 1);
      onSetChange(1);
    }
  };

  const handlePrevious = () => {
    if (currentSet > 1) {
      onSetChange(currentSet - 1);
    } else if (currentExerciseIndex > 0) {
      onExerciseChange(currentExerciseIndex - 1);
      onSetChange(exercises[currentExerciseIndex - 1]?.sets || 1);
    }
  };

  return (
    <div className="timer-controls">
      <div className="control-buttons">
        {!isWorkoutActive ? (
          <button 
            className="control-button start-button"
            onClick={onStart}
            disabled={exercises.length === 0}
          >
            <span className="control-icon">▶️</span>
            START WORKOUT
          </button>
        ) : (
          <>
            <button 
              className="control-button pause-button"
              onClick={onReset}
            >
              <span className="control-icon">⏸️</span>
              PAUSE
            </button>
            <button 
              className="control-button reset-button"
              onClick={onReset}
            >
              <span className="control-icon">🔄</span>
              RESET
            </button>
          </>
        )}
      </div>
      
      {isWorkoutActive && (
        <div className="navigation-controls">
          <button 
            className="nav-button prev-button"
            onClick={handlePrevious}
            disabled={currentExerciseIndex === 0 && currentSet === 1}
          >
            ← PREVIOUS
          </button>
          <div className="current-position">
            <span className="position-label">Exercise {currentExerciseIndex + 1}</span>
            <span className="position-separator">•</span>
            <span className="position-label">Set {currentSet}</span>
          </div>
          <button 
            className="nav-button next-button"
            onClick={handleNext}
            disabled={currentExerciseIndex === exercises.length - 1 && 
                     currentSet === exercises[currentExerciseIndex]?.sets}
          >
            NEXT →
          </button>
        </div>
      )}
    </div>
  );
};

export default TimerControls;