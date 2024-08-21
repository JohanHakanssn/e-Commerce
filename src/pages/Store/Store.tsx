import { Outlet } from "react-router-dom";
import NavBar from "components/NavBar/NavBar";
import Footer from "components/ReduxTest/fotter/fotter";

function Store() {
	return (
		<section>
			<NavBar />
			<Outlet />
			<Footer />
		</section>
	)
}

export default Store