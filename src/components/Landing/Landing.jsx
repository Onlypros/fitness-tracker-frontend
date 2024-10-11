import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <main>
      <h1>Stay Motivated, Stay Focused, Stay Fit!</h1>
        <div className="landing-h3">
          <h3>Your fitness goals are within reach, and we’re here to help you get there. Set your workout goals, track your achievements, and get the motivation you need to stay consistent. Whether you're a beginner or a pro, this is the ultimate tool to push yourself further. Create an account today and start your journey towards a healthier, stronger you!</h3>
          <Link to="/signup" className="signup-link">Sign Up Now!</Link>
        </div>
      </main>
  );
};

export default Landing;