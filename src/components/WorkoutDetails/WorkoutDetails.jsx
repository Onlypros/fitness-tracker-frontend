import { useState, useEffect, useContext } from "react";
import { AuthedUserContext } from "../../App";
import { useParams, Link } from "react-router-dom";
import * as workoutService from "../../services/workoutService";
import GoalForm from "../GoalForm/GoalForm";
import styles from "./WorkoutDetails.module.css";
import ProgressPhoto from "../ProgressPhoto/ProgressPhoto";

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

  function updateWorkoutState (workout, newWorkoutDoc) {
    const index = props.workouts.indexOf(workout)
    const newWorkouts = [...props.workouts]
    newWorkouts.splice(index, 1)
    newWorkouts.push(newWorkoutDoc)
    props.setWorkouts(newWorkouts)
  }

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
    updateWorkoutState(workout, newWorkoutDoc)
    setWorkout((prev) => ({
      ...prev,
      goals: newWorkoutDoc.goals,
    }));
  }

  async function handleToggleGoalComplete(goalId, isComplete) {
    const updatedGoal = { isComplete: !isComplete };
    const updatedWorkout = await workoutService.updateGoal(
      workoutId,
      goalId,
      updatedGoal
    );
    if (updatedWorkout && updatedWorkout.error) {
      console.error(updatedWorkout.error);
      return;
    }
    updateWorkoutState(workout, updatedWorkout)
    setWorkout((prev) => ({
      ...prev,
      goals: prev.goals.map((goal) =>
        goal._id === goalId ? { ...goal, isComplete: !isComplete } : goal
      ),
    }));
  }
  if (!workout) return <main>Loading....</main>;

  return (
    <main className={styles.container}>
      
      <header>
        <h1>Workout: {workout.workoutType}</h1>
        <p>
          <strong>Calories Burned:</strong> {workout.caloriesBurned}
        </p>
        <p>{workout.goalType}</p>
        <p>
          <strong>Notes:</strong> {workout.notes}
        </p>
        <p>
          <strong>Date of Workout:</strong>{" "}
          {new Date(workout.startDate).toLocaleDateString()}
        </p>
        {workout.user === loggedInUser._id && (
          <>
            <button onClick={() => props.handleDeleteWorkout(workoutId)}>
              Delete
            </button>
            <Link className={styles.link} to={`/workouts/${workoutId}/edit`}>
              Edit
            </Link>
          </>
        )}
      </header>
      <Link className={styles.link} to={"/workouts"}>
        Back to Workouts
      </Link>
        <ProgressPhoto workoutId={workoutId}/>
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
              <p>End Date: {new Date(goal.endDate).toLocaleDateString()}</p>
              <label className={styles.checkboxContainer}>
                Goal Complete
                <div className={styles.checkboxWrapper}>
                  <input
                    id={`goal-complete-${goal._id}`}
                    name={`goal-complete-${goal._id}`}
                    type="checkbox"
                    checked={goal.isComplete || false}
                    onChange={() =>
                      handleToggleGoalComplete(goal._id, goal.isComplete)
                    }
                  />
                  <span className={styles.checkmark}></span>
                </div>
              </label>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
