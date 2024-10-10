import { useState, createContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';


// these are our service files
import * as authService from '../src/services/authService'; // import the authservice
import * as workoutService from '../src/services/workoutService'

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [workouts, setWorkouts] = useState([]);
  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  useEffect(() => {
    async function fetchAllworkouts() {
      const workoutData = await workoutService.index();
      setWorkouts(workoutData);
    }
    // check if we are logged in before we fetch!
    if (user) {
      fetchAllworkouts();
    }
  }, [user])

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <Route path="/" element={<Dashboard user={user} />} />
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
