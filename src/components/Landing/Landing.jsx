import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Welcome to Active Vibe!!</h1>
      <h3 className={styles.title}>Stay Motivated, Stay Focused, Stay Fit!</h3>
      <div className={styles.content}>
        <h3 className={styles.subtitle}>
          Your fitness goals are within reach, and we’re here to help you get
          there. Set your workout goals, track your achievements, and get the
          motivation you need to stay consistent. Whether you're a beginner or a
          pro, this is the ultimate tool to push yourself further.
        </h3>
        <Link to="/signup" className={styles.signupButton}>
          Sign Up Now!
        </Link>
      </div>

      <section className={styles.benefits}>
        <h2>Why Choose Us?</h2>
        <ul>
          <li>🎯 Personalized Goal Setting</li>
          <li>📊 Progress Tracking</li>
        </ul>
      </section>

      <footer className={styles.footer}>
        <p className={styles.motivationQuote}>
          “The journey of a thousand miles begins with one step.” - Lao Tzu
        </p>
      </footer>
    </main>
  );
};

export default Landing;
