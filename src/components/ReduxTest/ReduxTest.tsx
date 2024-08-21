import { useAppDispatch } from "hooks/reduxHooks";
import { addItem, removeItem, incrementItem, decrementItem, clearCart } from "slices/cartSlice";
import { useCartTotal } from "hooks/useCartTotal.ts";
import { useState } from "react";
import styles from "./reduxTest.module.css"

interface Product {
	productName: string;
	productId: string;
	price: number;
}
function ReduxTest() {
	const dispatch = useAppDispatch();
	const [inputQuantityOne, setInputQuantityOne] = useState<number>(1);
	const [inputQuantityTwo, setInputQuantityTwo] = useState<number>(1);
	const { totalItemsInCart, totalPriceOfCart } = useCartTotal();
	const itemOne: Product = {
		productName: "Product One",
		productId: "g90ug3jg",
		price: 35,
	}
	const itemTwo: Product = {
		productName: "Product Two",	
		productId: "g9032tfw",
		price: 99,
	}
	const handleAddItem = (item: Product, inputQuantity: number) => {
		const newItem = {
			productName: item.productName,
			productId: item.productId,
			price: item.price,
			quantity: inputQuantity,
		}
		dispatch(addItem(newItem))
	}
	return (
		<section className={styles.section}>
			<div className={styles.articlesDiv}>
				<article className={styles.article}>
					<p>productName: Product One</p>
				
					<p>productId: g90ug3jg</p>
					<p>price: 35</p>
					<input name="inputQuantity" type="number" value={inputQuantityOne} onChange={(e) => setInputQuantityOne(Number(e.target.value))} />
					<button
						onClick={() => handleAddItem(itemOne, inputQuantityOne)}
					>
						Add item
					</button>
					<button
						onClick={() =>
							dispatch(incrementItem(itemOne.productId))
						}
					>
						+
					</button>
					<button
						onClick={() =>
							dispatch(decrementItem(itemOne.productId))
						}
					>
						-
					</button>
					<button
						onClick={() =>
							dispatch(removeItem(itemOne.productId))
						}
					>
						Remove item
					</button>
				</article>
				<article className={styles.article}>
					<p>productName: Product Two</p>
					<p>productId: g9032tfw</p>
					<p>price: 99</p>
					<input type="number" id="quantityInput2" value={inputQuantityTwo} onChange={(e) => setInputQuantityTwo(Number(e.target.value))} />
					<button
						onClick={() => handleAddItem(itemTwo, inputQuantityTwo)}
					>
						Add item
					</button>
					<button
						onClick={() =>
							dispatch(incrementItem(itemTwo.productId))
						}
					>
						+
					</button>
					<button
						onClick={() =>
							dispatch(decrementItem(itemTwo.productId))
						}
					>
						-
					</button>
					<button
						onClick={() =>
							dispatch(removeItem(itemTwo.productId))
						}
					>
						Remove item
					</button>
				</article>
			</div>
			<button onClick={() => dispatch(clearCart())}>Clear cart</button>
			<h3>Number of items: {totalItemsInCart}</h3>
			<h3>Total price: {totalPriceOfCart}</h3>
		</section>
	);
}

export default ReduxTest