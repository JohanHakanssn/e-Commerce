import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AdminNotFound() {
	const navigate = useNavigate();
	useEffect(() => {
		const handler = setTimeout(() => {
			navigate("/admin", { replace: true });
		}, 3000);

		return () => {
			clearTimeout(handler);
		};
	})
	return (
		<section>
			<p>404. Page could not be found.</p>
			<p onClick={() => navigate(-1)}>Go back</p>
			<p onClick={() => navigate("/admin", { replace: true })}>Back to Admin</p>
		</section>
	);
}

export default AdminNotFound;
