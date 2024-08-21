import styles from "./admin.module.css"
import { Outlet } from "react-router-dom";
import AdminNavBar from "pages/Admin/components/AdminNavBar/AdminNavBar"




function Admin() {

	return (
		<section className={styles.section}>
			<AdminNavBar />
			<Outlet />
		</section>
	);
}

export default Admin