import styles from "./admin-navbar.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useClickOutside } from "hooks/useClickOutside";

function AdminNavBar() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const ref = useClickOutside(() => {
    setOpenMenu(false);
  });
  return (
    <nav className={styles.nav}>
      <div ref={ref} className={styles.menuDiv}>
        <button
          className={styles.menuButton}
          type="button"
          onClick={() => setOpenMenu(!openMenu)}
        >
          Menu
        </button>
        {openMenu && (
          <menu className={styles.menu}>
            <li className={styles.menuItems} onClick={() => setOpenMenu(false)}>
              <Link to="/admin/main" className={styles.menuLink}>
                Admin
              </Link>
            </li>
            <li className={styles.menuItems} onClick={() => setOpenMenu(false)}>
              <Link to="/admin/new-product" className={styles.menuLink}>
                Add new product
              </Link>
            </li>
            <li className={styles.menuItems} onClick={() => setOpenMenu(false)}>
              <Link to="/admin/update-product" className={styles.menuLink}>
                Update product
              </Link>
            </li>
            <li className={styles.menuItems} onClick={() => setOpenMenu(false)}>
              <Link to="/admin/edit-store" className={styles.menuLink}>
                Edit store
              </Link>
            </li>
            <li className={styles.menuItems} onClick={() => setOpenMenu(false)}>
              <Link to="/admin/logout" className={styles.menuLink}>
                Logout
              </Link>
            </li>
            <li className={styles.menuItems} onClick={() => setOpenMenu(false)}>
              <Link to="/" className={styles.menuLink}>
                Homepage
              </Link>
            </li>
          </menu>
        )}
      </div>
    </nav>
  );
}

export default AdminNavBar;
