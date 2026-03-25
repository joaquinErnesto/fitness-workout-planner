import { useState, useCallback } from 'react';
import { calculateTotalWorkoutTime } from '../utils/workoutCalculations';

const useWorkoutTime = () => {
  const [totalTime, setTotalTime] = useState(0);
  const [exerciseTimes, setExerciseTimes] = useState([]);
  const [setTimes, setSetTimes] = useState([]);

  const updateWorkoutTimes = useCallback((exercises) => {
    const { totalTime: newTotalTime, exerciseTimes: newExerciseTimes } = 
      calculateTotalWorkoutTime(exercises);
    
    setTotalTime(newTotalTime);
    setExerciseTimes(newExerciseTimes);
    
    // Calculate individual set times
    const setTimesArray = exercises.map(exercise => {
      const setDuration = exercise.repetitions.reduce((sum, reps) => sum + reps * 2, 0); // Assuming 2 seconds per rep
      return Array(exercise.sets).fill(setDuration / exercise.sets);
    });
    setSetTimes(setTimesArray);
  }, []);

  return {
    totalTime,
    exerciseTimes,
    setTimes,
    updateWorkoutTimes
  };
};

export default useWorkoutTime;