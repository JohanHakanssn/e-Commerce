import styles from './navBar.module.css';
import { Link } from 'react-router-dom';

function NavBar() {
	return (
		<>
			<nav className={styles.NavBar}>
				<div className={styles.wraper}>
					<h3>SKJN Store</h3>
					<Link className={styles.link} to='/'>
						Home
					</Link>
					<Link className={styles.link} to='/products'>
						Products
					</Link>
					<Link className={styles.link} to='/cart'>
						Cart
					</Link>
					<Link className={styles.link} to='/categories'>
						Categories
					</Link>
				</div>
			</nav>
		</>
	);
}

export default NavBar;
