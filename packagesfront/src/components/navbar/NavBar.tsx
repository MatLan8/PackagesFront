import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.homeLink}>
        All Packages
      </Link>
      <div className={`${styles.linksContainer}`}>
        <Link to="/PackageCreation">Create package</Link>
      </div>
    </nav>
  );
};

export default NavBar;
