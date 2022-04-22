import { Link, useLocation } from "react-router-dom";
import styles from "./Navigation.module.css";
import logo from "../../images/logo.webp";
const Nav = () => {
  const { pathname } = useLocation();
  const menuNames = ["", "favourites", "contact"];
  return (
    <nav className={styles.navContainer}>
      <div className={styles.navInside}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Business  Logo" />
        </div>
        <div className={styles.navItems}>
          {menuNames.map((menu) => {
            return (
              <div
                className={`${styles.linkContainer} ${
                  pathname === "/" + menu ? styles.selected : null
                }`}
              >
                <Link to={"/" + menu}>{menu === "" ? "gallery" : menu}</Link>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
