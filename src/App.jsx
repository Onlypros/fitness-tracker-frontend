import { useState, createContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
import WorkoutList from "./components/WorkoutList/WorkoutList";
import WorkoutForm from "./components/WorkoutForm/WorkoutForm";
import WorkoutDetails from "./components/WorkoutDetails/WorkoutDetails";

import * as authService from "../src/services/authService"; 
import * as workoutService from "../src/services/workoutService";

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); 
  const [workouts, setWorkouts] = useState([]);

  const navigate = useNavigate();

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  async function handleAddWorkout(workoutFormData) {
    const newWorkout = await workoutService.create(workoutFormData);
    setWorkouts([newWorkout, ...workouts]);
    navigate("/workouts");
  }

  async function handleDeleteWorkout(workoutId) {
    const response = await workoutService.deleteWorkout(workoutId);
    setWorkouts(workouts.filter((workout) => workout._id != workoutId));
    navigate("/workouts");
  }

  async function handleUpdateWorkout(workoutId, workoutFormData) {
    const updatedWorkout = await workoutService.update(
      workoutId,
      workoutFormData
    );
    setWorkouts(
      workouts.map((workout) =>
        workoutId === workout._id ? updatedWorkout : workout
      )
    );
    navigate(`/workouts/${workoutId}`);
  }

  useEffect(() => {
    async function fetchAllworkouts() {
      const workoutData = await workoutService.index();
      setWorkouts(workoutData);
    }
    if (user) {
      fetchAllworkouts();
    }
  }, [user]);

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route
                path="/workouts"
                element={<WorkoutList workouts={workouts} />}
              />
              <Route
                path="/workouts/new"
                element={<WorkoutForm handleAddWorkout={handleAddWorkout} />}
              />
              <Route
                path="/workouts/:workoutId"
                element={
                  <WorkoutDetails handleDeleteWorkout={handleDeleteWorkout} />
                }
              />
              <Route
                path="/workouts/:workoutId/edit"
                element={
                  <WorkoutForm handleUpdateWorkout={handleUpdateWorkout} />
                }
              />
            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
