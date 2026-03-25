import { useState } from 'react';
import './ExerciseCard.css';

const ExerciseCard = ({ exercise, index, isActive, onDelete, onUpdateReps, estimatedTime }) => {
  const [editingRep, setEditingRep] = useState(null);

  const handleRepChange = (setIndex, value) => {
    if (value >= 0 && value <= 999) {
      onUpdateReps(exercise.id, setIndex, value);
    }
  };

  return (
    <div className={`exercise-card ${isActive ? 'active' : ''}`}>
      <div className="exercise-card-header">
        <div className="exercise-number">
          <span className="number-badge">#{index + 1}</span>
          <h3 className="exercise-name">{exercise.name}</h3>
        </div>
        <button 
          className="delete-btn"
          onClick={() => onDelete(exercise.id)}
          aria-label="Delete exercise"
        >
          ✕
        </button>
      </div>

      {exercise.image && (
        <div className="exercise-image-container">
          <img 
            src={exercise.image} 
            alt={exercise.name}
            className="exercise-image"
          />
        </div>
      )}

      <div className="exercise-info">
        <div className="info-row">
          <div className="info-item">
            <span className="info-label">Sets</span>
            <span className="info-value sets-value">{exercise.sets}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Rest Between Sets</span>
            <span className="info-value">{exercise.setRest}s</span>
          </div>
          <div className="info-item">
            <span className="info-label">Est. Time</span>
            <span className="info-value time-value">{estimatedTime}</span>
          </div>
        </div>
      </div>

      <div className="sets-container">
        <h4 className="sets-title">Sets & Reps:</h4>
        <div className="sets-grid">
          {Array.from({ length: exercise.sets }).map((_, setIndex) => (
            <div key={setIndex} className="set-item">
              <span className="set-number">Set {setIndex + 1}</span>
              {editingRep === setIndex ? (
                <div className="rep-edit">
                  <input
                    type="number"
                    value={exercise.repetitions[setIndex]}
                    onChange={(e) => handleRepChange(setIndex, e.target.value)}
                    className="rep-input"
                    min="0"
                    max="999"
                    autoFocus
                    onBlur={() => setEditingRep(null)}
                    onKeyPress={(e) => e.key === 'Enter' && setEditingRep(null)}
                  />
                  <span className="rep-unit">reps</span>
                </div>
              ) : (
                <div 
                  className="rep-display"
                  onClick={() => setEditingRep(setIndex)}
                >
                  <span className="rep-value">{exercise.repetitions[setIndex]}</span>
                  <span className="rep-unit">reps</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;