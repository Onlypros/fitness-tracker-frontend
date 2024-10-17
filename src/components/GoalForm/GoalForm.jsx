import { useState } from "react";

export default function GoalForm({ handleAddGoal }) {
  const [goalType, setGoalType] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!goalType) {
      alert("Please select a goal type.");
      return;
    }

    handleAddGoal({ goalType, endDate, isComplete: false }); 
    setGoalType("");
    setEndDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Goal Type:
        <select
          value={goalType}
          onChange={(e) => setGoalType(e.target.value)}
          required
        >
          <option value="">Select Goal Type</option>
          <option value="Weight Loss">Weight Loss</option>
          <option value="Muscle Gain">Muscle Gain</option>
          <option value="Steps">Steps</option>
          <option value="Building endurance">Building endurance</option>
          <option value="Flexibility Training">Flexibility Training</option>
          <option value="Be healthier">Be healthier</option>
        </select>
      </label>
      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Goal</button>
    </form>
  );
}
