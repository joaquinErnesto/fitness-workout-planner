import { useState } from 'react';
import './ExerciseForm.css';

const ExerciseForm = ({ onAddExercise }) => {
  const [formData, setFormData] = useState({
    name: '',
    sets: 3,
    reps: 10,
    setRest: 60,
    exerciseRest: 90,
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onAddExercise(formData);
      setFormData({
        name: '',
        sets: 3,
        reps: 10,
        setRest: 60,
        exerciseRest: 90,
        image: ''
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Rest') || name.includes('sets') || name.includes('reps') 
        ? parseInt(value) || 0 
        : value
    }));
  };

  return (
    <form className="exercise-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">
          <span className="label-icon">💪</span>
          Exercise Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g., Bench Press"
          required
        />
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">
            <span className="label-icon">🔄</span>
            Sets
          </label>
          <input
            type="number"
            name="sets"
            value={formData.sets}
            onChange={handleChange}
            className="form-input"
            min="1"
            max="20"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <span className="label-icon">📊</span>
            Reps per Set
          </label>
          <input
            type="number"
            name="reps"
            value={formData.reps}
            onChange={handleChange}
            className="form-input"
            min="1"
            max="100"
          />
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">
            <span className="label-icon">⏱️</span>
            Rest Between Sets (s)
          </label>
          <input
            type="number"
            name="setRest"
            value={formData.setRest}
            onChange={handleChange}
            className="form-input"
            min="0"
            max="300"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <span className="label-icon">⏰</span>
            Rest Between Exercises (s)
          </label>
          <input
            type="number"
            name="exerciseRest"
            value={formData.exerciseRest}
            onChange={handleChange}
            className="form-input"
            min="0"
            max="600"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          <span className="label-icon">🖼️</span>
          Image URL (Optional)
        </label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="form-input"
          placeholder="Paste image URL here"
        />
      </div>

      <button type="submit" className="submit-button">
        <span className="submit-icon">⚡</span>
        ADD EXERCISE TO WORKOUT
      </button>
    </form>
  );
};

export default ExerciseForm;