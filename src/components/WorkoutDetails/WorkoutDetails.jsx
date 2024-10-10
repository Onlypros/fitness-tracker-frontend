import { useState, useEffect, useContext } from "react";

import { AuthedUserContext, WuthedUserContext } from '../../App';

import { useParams, Link } from "react-router-dom";

import * workoutService from "../../services/workoutService";

export default function WorkoutDetails(props) {
    const [workout, setWorkout] = useState(null);

    const loggedInUser = useContext(AuthedUserContext);

    const { workoutId } = useParams();
    console.log(workoutId, "Workout ID");

    useEffect(() => {
        async function getWorkout() {

            const workoutData = await workoutService.show(workoutId);
            setWorkout(workoutData);
        }

        getWorkout();
    }, [workoutId]);


    async function handleAddGoal(goalFormData) {
    const newWorkoutDoc = await workoutService.createGoal(hootId, goalFormData)
    setWorkout(newWorkoutDoc)
    }
    if (!workout) return <main>Loading....</main>;

    return (
        <main>
            <header>
                <p>{workout.category.toUppercase()}</p>
                <h1>{workout.title}</h1>
        <p>{workout.username}</p>

		
		{workout._id === loggedInUser._id ? <button onClick={() => props.handleDeleteWorkout(workoutId)}>Delete</button> : ''}
		{workout._id === loggedInUser._id ? <Link to={`/workout/${workoutId}/edit`}>Edit</Link> : ''}
      </header>
      <p>{workout.text}</p>
      <section>
        <h2>Goals</h2>
		<GoalForm handleAddGoal={handleAddGoal}/>
        
        {!workout.goal.length && <p>There are no goals</p>}

        {hoot.goals.map((goal) => {
          return (
		  	<article key={goal._id}>
				<header>
					<p>{goal.username}</p>
				</header>
				<p>{goal.text}</p>
			</article>
			)
        })}
      </section>
    </main>
  );
}

