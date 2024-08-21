import { useNavigate } from "react-router-dom"

function NotFound() {
	const navigate = useNavigate();
	return (
		<section>
			<p>404. Page could not be found.</p>
			<p onClick={() => navigate(-1)}>Go back</p>
			<p onClick={() => navigate("/", {replace: true})}>Back to home</p>
		</section>
	)
}

export default NotFound