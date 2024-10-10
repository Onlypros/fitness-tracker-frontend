import { useState, useEffect, useContext } from "react";
import { AuthedUserContext } from "../../App";
import { useParams, Link } from "react-router-dom";
import * as workoutService from "../../services/workoutService";
import GoalForm from "../GoalForm/GoalForm";

export default function WorkoutDetails(props) {
  const [workout, setWorkout] = useState(null);
  const loggedInUser = useContext(AuthedUserContext);
  const { workoutId } = useParams();

  console.log(workoutId, "Workout ID");

  useEffect(() => {
    async function getWorkout() {
      const workoutData = await workoutService.show(workoutId);
      setWorkout({ ...workoutData, goals: workoutData.goals || [] });
      console.log(workoutData, "<-- workoutData"); // Log the data
    }

    getWorkout();
  }, [workoutId]);

  async function handleAddGoal(goalFormData) {
    console.log(goalFormData, "<-- Goal Form Data Before Submission");

    if (!goalFormData.goalType || !goalFormData.endDate) {
      console.error("Goal type and end date are required");
      return;
    }

    const newWorkoutDoc = await workoutService.createGoal(
      workoutId,
      goalFormData
    );
    console.log(newWorkoutDoc, "<-- Response from createGoal");

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
    <main>
      <header>
        <p>{workout.workoutType}</p>
        <h1>{workout.caloriesBurned}</h1>
        <p>{workout.goalType}</p>
        <p>{new Date(workout.endDate).toLocaleDateString()}</p>

        {workout.user === loggedInUser._id && (
          <>
            <button onClick={() => props.handleDeleteWorkout(workoutId)}>
              Delete
            </button>
            <Link to={`/workouts/${workoutId}/edit`}>Edit</Link>
          </>
        )}
      </header>
      <p>{workout.notes}</p>
      <section>
        <h2>Goals</h2>
        <GoalForm handleAddGoal={handleAddGoal} />

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
