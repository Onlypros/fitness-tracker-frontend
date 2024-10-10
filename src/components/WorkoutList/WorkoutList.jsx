import { Link } from "react-router-dom";

export default function WorkoutList({ workouts }) {
  const workoutList = workouts.map((workout) => {
    return (
      <main key={workout._id}>
        <Link to={`/workouts/${workout._id}`}>
          <article>
            <header>
              <h2>Workout Type: {workout.workoutType}</h2>
            </header>
            <p>Calories Burned: {workout.caloriesBurned}</p>
          </article>
        </Link>
      </main>
    );
  });
  return <main>{workoutList}</main>;
}
