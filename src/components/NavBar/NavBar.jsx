import { Link } from "react-router-dom";
import { AuthedUserContext } from "../../App";
import { useContext, useState } from "react";
import styles from "./NavBar.module.css";

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.hamburger} onClick={toggleMenu}>
          <div
            className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`}
          ></div>
          <div
            className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`}
          ></div>
          <div
            className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`}
          ></div>
        </div>
        <div className={styles.welcomeMessage}>
          {user
            ? `Welcome, ${user.username.toUpperCase()}`
            : "Welcome! Please sign in."}
        </div>
        <ul className={`${styles.navList} ${isMenuOpen ? styles.active : ""}`}>
          {user ? (
            <>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/workouts">Workouts</Link>
              </li>
              <li>
                <Link to="/workouts/new">New Workout</Link>
              </li>
              <li>
                <Link to="" onClick={handleSignout}>
                  Sign Out
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
