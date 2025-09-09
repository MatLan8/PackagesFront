import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/">All Packages</Link>
      <Link to="/PackageCreation">Create Package</Link>
    </nav>
  );
};

export default NavBar;
