import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import styles from "./Navigation.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { v4 as uuidv4 } from "uuid";
import logo from "../../images/logo.webp";
const Nav = () => {
  const { pathname } = useLocation();
  const menuNames = ["", "favourites", "contact"];
  const [toggle, setToggle] = useState(false);
  const toggleMenu = () => {
    setToggle(!toggle);
  };
  const renderItems = menuNames.map((menu) => {
    return (
      <div
        key={uuidv4()}
        className={`${styles.linkContainer} ${
          pathname === "/" + menu ? styles.selected : null
        }`}
        onClick={setToggle ? () => setToggle(false) : null}
      >
        <Link to={"/" + menu}>{menu === "" ? "gallery" : menu} </Link>
      </div>
    );
  });
  return (
    <nav className={styles.navContainer}>
      <div className={styles.navInside}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Business  Logo" />
        </div>

        <div className={styles.desktop}>{renderItems}</div>
        <div className={styles.mobileMenu}>
          <MenuIcon
            className={styles.menuLogo}
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${styles.mobileMenuInside} ${
              toggle ? styles.visible : styles.hidden
            }`}
          >
            {renderItems}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
