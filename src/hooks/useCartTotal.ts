import { useAppSelector } from "hooks/reduxHooks";

export function useCartTotal() {
	const cart = useAppSelector((state) => state.cart.items)
			const totalItemsInCart = cart.reduce(
				(acc, curr) => acc + curr.quantity,
				0
			);
			const totalPriceOfCart = cart.reduce(
				(acc, curr) => acc + curr.price * curr.quantity,
				0
			);
	

	return { totalItemsInCart, totalPriceOfCart };
}
