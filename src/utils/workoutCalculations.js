export const calculateTotalWorkoutTime = (exercises) => {
  let totalTime = 0;
  const exerciseTimes = [];

  exercises.forEach((exercise, index) => {
    let exerciseTime = 0;
    
    // Calculate time for all sets of this exercise
    // Assuming 2 seconds per rep as exercise time
    const totalRepTime = exercise.repetitions.reduce((sum, reps) => sum + (reps * 2), 0);
    
    // Add rest between sets (except after last set)
    const setRestTime = exercise.setRest * (exercise.sets - 1);
    
    exerciseTime = totalRepTime + setRestTime;
    
    // Add rest after this exercise (except for last exercise)
    if (index < exercises.length - 1) {
      exerciseTime += exercise.exerciseRest;
    }
    
    totalTime += exerciseTime;
    exerciseTimes.push(exerciseTime);
  });

  return { totalTime, exerciseTimes };
};

export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
};