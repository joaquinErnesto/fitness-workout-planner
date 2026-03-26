import { useState } from 'react';
import ExerciseCard from './components/ExerciseCard';
import ImageUploader from './components/ImageUploader';
import ExerciseForm from './components/ExerciseForm';
import TimerDisplay from './components/TimerDisplay';
import TimerControls from './components/TimerControls';
import useWorkoutTime from './hooks/useWorkoutTime';
import './App.css';

function App() {
  // All state is already initialized to empty/default values
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  
  const { 
    totalTime, 
    exerciseTimes, 
    updateWorkoutTimes 
  } = useWorkoutTime();

  const handleAddExercise = (exercise) => {
    const newExercise = {
      ...exercise,
      id: Date.now() + Math.random(),
      repetitions: Array(exercise.sets).fill(0).map(() => exercise.reps || 0)
    };
    
    const updatedExercises = [...exercises, newExercise];
    setExercises(updatedExercises);
    
    // Update workout timing calculations
    updateWorkoutTimes(updatedExercises);
  };

  const handleDeleteExercise = (id) => {
    const updatedExercises = exercises.filter(ex => ex.id !== id);
    setExercises(updatedExercises);
    
    if (currentExerciseIndex >= updatedExercises.length) {
      setCurrentExerciseIndex(Math.max(0, updatedExercises.length - 1));
    }
    
    updateWorkoutTimes(updatedExercises);
  };

  const handleUpdateReps = (exerciseId, setIndex, newReps) => {
    const updatedExercises = exercises.map(ex => {
      if (ex.id === exerciseId) {
        const newRepetitions = [...ex.repetitions];
        newRepetitions[setIndex] = parseInt(newReps) || 0;
        return { ...ex, repetitions: newRepetitions };
      }
      return ex;
    });
    setExercises(updatedExercises);
    updateWorkoutTimes(updatedExercises);
  };

  const startWorkout = () => {
    if (exercises.length > 0) {
      setIsWorkoutActive(true);
      setCurrentExerciseIndex(0);
      setCurrentSet(1);
    }
  };

  const resetWorkout = () => {
    setIsWorkoutActive(false);
    setCurrentExerciseIndex(0);
    setCurrentSet(1);
  };

  // Handle image selection from uploader
  const handleImageSelect = (imageData) => {
    // You can store the image temporarily or add it to a new exercise
    console.log('Image selected:', imageData);
    // This can be expanded to add the image to the current exercise being created
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">🔥 FIT FLOW MASTER 🔥</h1>
        <p className="app-subtitle">Ultimate Workout Planner & Timer</p>
      </header>

      <div className="app-content">
        {/* Left Panel - Exercise Creation */}
        <div className="creation-panel">
          <div className="panel-card">
            <h2 className="panel-title">🛠️ CREATE YOUR WORKOUT</h2>
            <ImageUploader onImageSelect={handleImageSelect} />
            <ExerciseForm onAddExercise={handleAddExercise} />
          </div>
        </div>

        {/* Right Panel - Display & Control */}
        <div className="display-panel">
          {/* Timer Section */}
          <div className="timer-section">
            <TimerDisplay 
              totalTime={totalTime}
              exerciseTimes={exerciseTimes}
              currentExerciseIndex={currentExerciseIndex}
              currentSet={currentSet}
              isWorkoutActive={isWorkoutActive}
            />
            
            <TimerControls
              isWorkoutActive={isWorkoutActive}
              onStart={startWorkout}
              onReset={resetWorkout}
              exercises={exercises}
              currentExerciseIndex={currentExerciseIndex}
              currentSet={currentSet}
              onExerciseChange={setCurrentExerciseIndex}
              onSetChange={setCurrentSet}
            />
          </div>

          {/* Exercises Display */}
          <div className="exercises-display">
            <h2 className="exercises-title">💪 YOUR WORKOUT EXERCISES</h2>
            <div className="exercises-grid">
              {exercises.map((exercise, index) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  index={index}
                  isActive={isWorkoutActive && index === currentExerciseIndex}
                  onDelete={handleDeleteExercise}
                  onUpdateReps={handleUpdateReps}
                  estimatedTime={exerciseTimes[index] || '0'}
                />
              ))}
            </div>
            
            {exercises.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">🏋️</div>
                <h3>No exercises added yet</h3>
                <p>Start by adding your first exercise above!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;