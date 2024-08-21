import styles from './home.module.css';
import { TypeAnimation } from 'react-type-animation';
import { useEffect } from 'react';
import GetProducts, {
	Product,
} from 'components/HomePageProducts/HomePageProducts';

function Home() {
	useEffect(() => {
		// Funktion för att hämta produkter
		const fetchData = async () => {
			await GetProducts(1);
		};

		fetchData();
	}, []);

	return (
		<>
			<h1 className={styles.HiddenLogo}>SKJN Store</h1>
			<section className={styles.section}>
				<div className={styles.container}>
					<section className={styles.productSection}>
						<TypeAnimation
							className={styles.typedText}
							sequence={[
								'Why dont you checkout our Shoes?',
								2000,
								'Why dont you checkout our Hats?',
								2000,
								'Why dont you checkout our Pants?',
								2000,
								'Why dont you checkout our Shirts?',
								2000,
							]}
							speed={40}
							repeat={Infinity}
						/>
						<section className={styles.productPics}>
							<Product />
						</section>
					</section>
				</div>
			</section>
		</>
	);
}

export default Home;
