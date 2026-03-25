import { useState, useCallback } from 'react';
import { calculateTotalWorkoutTime } from '../utils/workoutCalculations';

const useWorkoutTime = () => {
  const [totalTime, setTotalTime] = useState(0);
  const [exerciseTimes, setExerciseTimes] = useState([]);

  const updateWorkoutTimes = useCallback((exercises) => {
    const { totalTime: newTotalTime, exerciseTimes: newExerciseTimes } = 
      calculateTotalWorkoutTime(exercises);
    
    setTotalTime(newTotalTime);
    setExerciseTimes(newExerciseTimes);
  }, []);

  return {
    totalTime,
    exerciseTimes,
    updateWorkoutTimes
  };
};

export default useWorkoutTime;