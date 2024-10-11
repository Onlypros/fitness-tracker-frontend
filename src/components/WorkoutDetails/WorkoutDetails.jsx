import { useState, useEffect, useContext } from "react";
import { AuthedUserContext } from "../../App";
import { useParams, Link } from "react-router-dom";
import * as workoutService from "../../services/workoutService";
import GoalForm from "../GoalForm/GoalForm";
import styles from './WorkoutDetails.module.css'


export default function WorkoutDetails(props) {
  const [workout, setWorkout] = useState(null);
  const loggedInUser = useContext(AuthedUserContext);
  const { workoutId } = useParams();

  useEffect(() => {
    async function getWorkout() {
      const workoutData = await workoutService.show(workoutId);
      setWorkout({ ...workoutData, goals: workoutData.goals || [] });
    }

    getWorkout();
  }, [workoutId]);

  async function handleAddGoal(goalFormData) {

    if (!goalFormData.goalType || !goalFormData.endDate) {
      return;
    }

    const newWorkoutDoc = await workoutService.createGoal(
      workoutId,
      goalFormData
    );

    if (newWorkoutDoc && newWorkoutDoc.error) {
      console.error(newWorkoutDoc.error);
      return;
    }

    setWorkout((prev) => ({
      ...prev,
      goals: newWorkoutDoc.goals,
    }));
  }

  if (!workout) return <main>Loading....</main>;

  return (
    <main className={styles.container}>
      <header>
        <h1>Workout Type: {workout.workoutType}</h1>
        <p>Calories Burned: {workout.caloriesBurned}</p>
        <p>{workout.goalType}</p>

        {workout.user === loggedInUser._id && (
          <>
            <button onClick={() => props.handleDeleteWorkout(workoutId)}>
              Delete
            </button>
            <Link className={styles.link} to={`/workouts/${workoutId}/edit`}>Edit</Link>
          </>
        )}
      </header>
      <p>{workout.notes}</p>
      <section>
        <GoalForm handleAddGoal={handleAddGoal} />
        <h2>Goals</h2>

        {workout.goals.length === 0 ? (
          <p>There are no goals</p>
        ) : (
          workout.goals.map((goal) => (
            <article key={goal._id}>
              <header>
                <p>Goal Type: {goal.goalType}</p>
              </header>
              <p>End Date: {new Date(goal.endDate).toLocaleDateString()}</p>{" "}
            </article>
          ))
        )}
      </section>
    </main>
  );
}
