import { Link } from "react-router-dom";
import styles from './WorkoutList.module.css'


export default function WorkoutList({ workouts }) {
  const workoutList = workouts.map((workout) => {
    return (
      <main className={styles.container} key={workout._id}>
        <Link className={styles.link} to={`/workouts/${workout._id}`}>
          <article className={styles.article}>
            <header>
              <h2>Workout Type: {workout.workoutType}</h2>
            </header>
            <p>Calories Burned: {workout.caloriesBurned}</p>
          </article>
        </Link>
      </main>
    );
  });
  return <main className={styles.container}>{workoutList}</main>;
}
