import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as workoutService from "../../services/workoutService";

const WorkoutForm = (props) => {
  const [formData, setFormData] = useState({
    workoutType: '',
    caloriesBurned: Number
  });

// <Route path='/workouts

const { workoutId } = useParams();
  useEffect (() => {
    async function fetchWorkout(){
      // workoutId comes from the params
      const workoutData = await workoutService.show(workoutId)
      // prefill out the form with the workouts data
      setFormData(workoutData)
    }

    if(workoutId){
      fetchWorkout()
    }
  }, [workoutId])

  const handleChange = (event) => {
	console.log(event.target.name)
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('formData', formData);

    if(workoutId){
      // update page
      props.handleUpdateWorkout(workoutId, formData);
    } else {
      // new page
      props.handleAddWorkout(formData)
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>{workoutId ? 'Edit Workout' : 'New Workout'}</h1>
        <label htmlFor="workoutType-input">Workout</label>
        <input
          required
          type="text"
          name="workoutType"
          id="workoutType-input"
          value={formData.workoutType}
          onChange={handleChange}
        />
        <label htmlFor="caloriesBurned-input">Calories Burned</label>
        <input
          required
          type="number"
          name="caloriesBurned"
          id="caloriesBurned-input"
          value={formData.caloriesBurned}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default WorkoutForm;
