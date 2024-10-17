import { AuthedUserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import * as workoutService from "../../services/workoutService";
import styles from "./Dashboard.module.css";
import GymSearch from "../GymSearch/GymSearch";

const Dashboard = () => {
  const user = useContext(AuthedUserContext);
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);
  const [averageCaloriesBurned, setAverageCaloriesBurned] = useState(0);

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const workouts = await workoutService.index();
        const userWorkouts = workouts.filter(
          (workout) => workout.user === user._id
        );

        setTotalWorkouts(userWorkouts.length); 

        const caloriesBurned = userWorkouts.reduce(
          (total, workout) => total + workout.caloriesBurned,
          0
        );
        setTotalCaloriesBurned(caloriesBurned); 

        const avgCalories =
          userWorkouts.length > 0 ? caloriesBurned / userWorkouts.length : 0;
        setAverageCaloriesBurned(avgCalories); 

       
        userWorkouts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setRecentWorkouts(userWorkouts.slice(0, 2)); 
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    }

    fetchWorkouts();
  }, [user]);

  return (
    <main className={styles.container}>
      
      <h1>Welcome, {user.username.toUpperCase()}</h1>
      <p>
        This is the dashboard page where you, and only you, can see a dashboard
        of all of your things.
      </p>
      <div className={styles.statsContainer}>
        <p>
          <strong>Total Workouts:</strong> {totalWorkouts}
        </p>
        <p>
          <strong>Total Calories Burned:</strong> {totalCaloriesBurned}
        </p>
        <p>
          <strong>Average Calories Burned:</strong>{" "}
          {averageCaloriesBurned.toFixed(2)}
        </p>
      </div>

      <div className={styles.recentWorkoutsContainer}>
        <h2>Recent Workouts</h2>
        {recentWorkouts.length > 0 ? (
          <ul>
            {recentWorkouts.map((workout) => (
              <li key={workout._id}>
                <strong>{workout.workoutType}</strong> -
                {workout.startDate
                  ? new Date(workout.startDate).toLocaleDateString()
                  : "Date not available"}{" "}
                - Calories Burned: {workout.caloriesBurned}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent workouts found.</p>
        )}
      </div>
      <section>
        <GymSearch />
      </section>
    </main>
  );
};

export default Dashboard;
