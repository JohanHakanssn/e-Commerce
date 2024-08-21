import { Navigate } from "react-router-dom";

function AdminLogin() {
	return (
		<section>
			<Navigate to="/admin/main" />
			Admin Login
		</section>
	)
}

export default AdminLogin