import React, { useEffect } from "react";
import CartItem from "../../components/CartItem/CartItem";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useRouteMatch, Redirect } from "react-router-dom";
import {
	decreaseItemQuantity,
	increaseItemQuantity,
	removeItem,
	checkout,
	clearCart,
} from "../../redux/Cart/action";

const Cart = () => {
	const dispatch = useDispatch();
	const cartState = useSelector((state) => state.cartReducer);
	const restaurantState = useSelector((state) => state.restaurantReducer);

	const history = useHistory();
	const { path, url } = useRouteMatch();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const cartItemsState = cartState.cartItems;
	const { restaurantProfile } = restaurantState;
	console.log("cartState ", cartState);

	// cart items amount total
	// const itemAmount = () => {
	// 	cartItemsState.forEach((item) => {});
	// };
	const increaseCartItemQuantity = (itemId) => {
		console.log("item id", itemId);
		// dispatch action to increment cart item quantity
		dispatch(increaseItemQuantity(itemId));
	};

	// increase Cart Item Quantity
	const decreaseCartItemQuantity = (itemId) => {
		console.log("item id", itemId);
		// dispatch action to decrement cart item quantity
		dispatch(decreaseItemQuantity(itemId));
	};

	const removeItemFromCart = (itemId) => {
		console.log("item id", itemId);
		// dispatch action to remove item from cart
		dispatch(removeItem(itemId));
	};

	// mapping jsx to cart items
	const cartItems =
		cartItemsState && cartItemsState.length > 0 ? (
			cartItemsState.map((item, index) => (
				<CartItem
					key={index}
					itemData={{ ...item }}
					increaseQuantity={increaseCartItemQuantity}
					decreaseQuantity={decreaseCartItemQuantity}
					removeItem={removeItemFromCart}
				/>
			))
		) : (
			<tr>
				<td colSpan="3" className="text-center">
					<p className="mt-3">No items in cart</p>
				</td>
			</tr>
		);
	console.log("[cart.js]", url, path);
	const style = {
		heading: {
			fontFamily: "inherit",
		},
	};
	return (
		<div className="px-4 px-lg-0">
			<div className="pb-5">
				<div className="container">
					<h3 className="py-3" style={style.heading}>
						Food Cart
					</h3>
					<div className="row">
						<div className="bg-white col-lg-8 col-sm-12 mb-5 p-5 rounded shadow-sm">
							{/* Shopping cart table */}
							<div>{cartItems}</div>
							<div className="">
								{" "}
								{cartItems.length > 0 && (
									<button
										className="btn btn-small btn-secondary pull-right"
										onClick={() => dispatch(clearCart())}
									>
										Clear Cart
									</button>
								)}
							</div>
							{/* End */}
						</div>
						<div className="col-sm-12 col-lg-4">
							<div className="bg-light rounded-pill px-4 pb-3 text-uppercase font-weight-bold">
								Order Summary
							</div>
							<div className="">
								<p className=" mb-4">
									Shipping and additional costs are calculated
									based on values you have entered.
								</p>
								<div className="row mx-0">
									<div className="d-flex border-bottom pb-2 justify-content-between">
										<strong className="text-muted">
											Order Subtotal
										</strong>
										<strong>
											<span className="rupee-symbol">&#8377;</span>
											{cartState.itemsTotalAmt}
										</strong>
									</div>
									<div className="d-flex border-bottom pb-2 justify-content-between">
										<strong className="text-muted">
											Shipping and handling
										</strong>
										<strong>
											<span className="rupee-symbol">&#8377;</span>
											{cartState.shippingAmt}
										</strong>
									</div>
									<div className="d-flex border-bottom pb-2 justify-content-between">
										<strong className="text-muted">
											Tax
										</strong>
										<strong>
											<span className="rupee-symbol">&#8377;</span>
											{cartState.taxAmount}
										</strong>
									</div>
									<div className="d-flex border-bottom pb-2 justify-content-between">
										<strong className="text-muted">
											Total
										</strong>
										<h5 className="font-weight-bold">
											<span className="rupee-symbol">&#8377;</span>
											{cartState.itemsTotalAmt +
												cartState.shippingAmt +
												cartState.taxAmount}
										</h5>
									</div>
								</div>
								<button
									onClick={() => {
										// return <Redirect to={`/restaurant/${restaurantProfile.url}/checkout`}/>
										history.push(
											`/restaurant/${restaurantProfile.url}/checkout`
										);
									}}
									className="btn btn-block btn-dark btn-success py-2 mb-2 rounded-pill"
									disabled={cartState.cartItems.length < 1}
								>
									Procceed To Checkout
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
