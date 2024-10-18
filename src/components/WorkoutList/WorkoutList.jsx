import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./WorkoutList.module.css";

export default function WorkoutList({ workouts }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGoalType, setSelectedGoalType] = useState("All");
  const [isCompleteFilter, setIsCompleteFilter] = useState("All");

  const filteredWorkouts = workouts.filter((workout) => {
    const matchesWorkoutType = workout.workoutType
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  
    const matchesGoalType =
      selectedGoalType === "All" ||
      workout.goals.some((goal) =>
        goal.goalType.toLowerCase().includes(selectedGoalType.toLowerCase())
      );
  
    const matchesIsComplete =
      isCompleteFilter === "All" ||
      (isCompleteFilter === "No Goals" && workout.goals.length === 0) ||
      (isCompleteFilter === "Complete" &&
        workout.goals.some((goal) => goal.isComplete === true)) ||
      (isCompleteFilter === "Incomplete" &&
        workout.goals.some((goal) => goal.isComplete === false));
  
    return matchesWorkoutType && matchesGoalType && matchesIsComplete;
  });

  const workoutList = filteredWorkouts.map((workout) => (
    <div key={workout._id}>
      <Link className={styles.link} to={`/workouts/${workout._id}`}>
        <article className={styles.article}>
          <header>
            <h2>{workout.workoutType}</h2>
          </header>
          <p>Calories Burned: {workout.caloriesBurned}</p>
          <p>
            Goal:{" "}
            {workout.goals.length > 0
              ? workout.goals[0].goalType
              : "No goals assigned yet"}
          </p>
          <p>
            Workout Date: {new Date(workout.startDate).toLocaleDateString()}
          </p>
        </article>
      </Link>
    </div>
  ));
  const goalTypes = [
    "All",
    ...new Set(
      workouts.flatMap((workout) => workout.goals.map((goal) => goal.goalType))
    ),
  ];

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <input
          type="text"
          id="searchQuery"
          name="searchQuery"
          placeholder="Search by workout type"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          id="goalType"
          name="goalType"
          value={selectedGoalType}
          onChange={(e) => setSelectedGoalType(e.target.value)}
        >
          {goalTypes.map((goalType, idx) => (
            <option key={idx} value={goalType}>
              {goalType}
            </option>
          ))}
        </select>
        <select
          id="completionStatus"
          name="completionStatus"
          value={isCompleteFilter}
          onChange={(e) => {
            console.log("Selected value:", e.target.value);
            setIsCompleteFilter(e.target.value);
          }}
        >
          <option value="All">All Goals</option>
          <option value="Complete">Completed Goals</option>
          <option value="Incomplete">Incomplete Goals</option>
          <option value="No Goals">No Goals Assigned</option>
        </select>
      </div>
      <div className={styles.workoutList}>
        {workoutList.length > 0 ? workoutList : <p>No workouts found.</p>}
      </div>
    </div>
  );
}
