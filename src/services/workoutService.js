const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/workouts`;

async function index() {
  try {
    const response = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err, "<-- err in the index workoutService");
  }
}

async function show(workoutId) {
  try {
    const response = await fetch(`${BASE_URL}/${workoutId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err, "<-- err in show workoutService");
  }
}

async function create(workoutFormData) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workoutFormData),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err, "<-- err in the create workoutService");
  }
}

async function createGoal(workoutId, goalFormData) {
  try {
    const response = await fetch(`${BASE_URL}/${workoutId}/goals`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(goalFormData),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err, "<-- err in the create goal workoutService");
  }
}

async function deleteWorkout(workoutId) {
  try {
    const response = await fetch(`${BASE_URL}/${workoutId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err, "<-- err in the delete workoutService");
  }
}

async function update(workoutId, workoutFormData) {
  try {
    const response = await fetch(`${BASE_URL}/${workoutId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workoutFormData),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err, "<-- err in the update workoutService");
  }
}

export { index, show, create, createGoal, deleteWorkout, update };
