import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as workoutService from "../../services/workoutService";
import styles from "./WorkoutForm.module.css";

const WorkoutForm = (props) => {
  const { workoutId } = useParams();

  const [formData, setFormData] = useState({
    workoutType: "",
    caloriesBurned: "",
    notes: "", // Initialize as an empty string
  });

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const workoutData = await workoutService.show(workoutId);
        // Check if workoutData has the expected structure
        if (workoutData) {
          setFormData({
            workoutType: workoutData.workoutType || "",
            caloriesBurned: workoutData.caloriesBurned || "",
            notes: workoutData.notes || "",
          });
        }
      } catch (error) {
        console.error("Error fetching workout:", error);
      }
    }

    if (workoutId) {
      fetchWorkout();
    }
  }, [workoutId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // For caloriesBurned, convert value to number
    setFormData({
      ...formData,
      [name]: name === "caloriesBurned" ? Number(value) : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("formData", formData);

    if (workoutId) {
      // Update existing workout
      props.handleUpdateWorkout(workoutId, formData);
    } else {
      // Add new workout
      props.handleAddWorkout(formData);
    }
  };

  return (
    <main>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h1>{workoutId ? "Edit Workout" : "New Workout"}</h1>
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
        <label htmlFor="notes-input">Notes</label>
        <textarea
          name="notes"
          id="notes"
          value={formData.notes}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Add Workout</button>
      </form>
    </main>
  );
};

export default WorkoutForm;
