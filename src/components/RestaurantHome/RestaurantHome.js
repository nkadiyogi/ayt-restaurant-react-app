import React, { useState, useEffect } from "react";
import "./RestaurantHome.css";
import { useSelector, useDispatch } from "react-redux";
import defaultImg from "../../images/image-not-found1.png";
import RestauranCarousel from "../RestaurantCarousel/RestauranCarousel";
import RestaurantProfile from "../RestaurantProfile/RestaurantProfile";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import resHomePic from "../../images/Home/homePic.jpg";
import {
	addToCart,
	increaseItemQuantity,
	decreaseItemQuantity,
} from "../../redux/Cart/action";
const RestaurantHome = () => {
	const restaurantState = useSelector((state) => state.restaurantReducer);
	const cartState = useSelector((state) => state.cartReducer);
	const { restaurantProfile, products } = restaurantState;
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	console.log("restaurantProfile", restaurantProfile);
	const qrCodeURL = `http://www.adiyogitechnosoft.com/restaurant/${restaurantProfile.qr_img}`;
	const style = {
		bioPicCols: {
			padding: "97px",
		},
		itemWrap: {
			width: "287px",
		},
		itemImg: {
			height: "287px",
		},
	};
	const onDefaultSrc = (ev) => {
		ev.target.src = defaultImg;
	};
	const getCarosualImages = () => {
		//
	};
	const { url, path } = useRouteMatch();
	// --------------
	const addProductToCart = (item) => {
		dispatch(addToCart(item));
	};
	// get cart item quantity
	const getCartItemQuantity = (itemId) => {
		const cartItem =
			cartState.cartItems &&
			cartState.cartItems.find((itemObj) => {
				// console.log("itemObj ", itemObj);
				return itemObj.item.id == itemId;
			});
		return cartItem ? cartItem.quantity : "";
	};

	// get cart items quantity category wise
	const getCartAllItemQuantity = () => {
		return cartState && cartState.cartItems
			? cartState.cartItems.length
			: "";
	};
	const getCartItemTotalAmount = () => {
		let total = 0;
		cartState &&
			cartState.cartItems.forEach((itemObj) => {
				// console.log(
				// 	"types iof ",
				// 	typeof itemObj.item.price,
				// 	typeof itemObj.quantity
				// );
				total =
					total +
					Number(itemObj.item.price) * Number(itemObj.quantity);
			});
		return total;
	};

	// increase Cart Item Quantity
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
	// ----------
	let popularFoods = products.filter((item) => item.special_product == 1);
	// const logoUrl = `http://adiyogitechnosoft.com/restaurant/${props.food.image_path}/${props.food.img}`;

	popularFoods = popularFoods.map((item, index) => {
		const foodPhoto = `http://adiyogitechnosoft.com/restaurant/${item.image_path}/${item.img}`;
		return (
			<div
				key={index}
				className="col-md-4 col-sm-12 col-xs-12 col-lg-3 col-xl-3 d-flex food-item justify-content-center"
			>
				<div className="food-item-wrap" style={style.itemWrap}>
					<div
						className="figure-wrap bg-image"
						data-image-src={foodPhoto}
						style={{
							background:
								// 'url("http://placehold.it/380x210") center center / cover no-repeat',
								`url(${foodPhoto}),url(${defaultImg}) center center / contain no-repeat`,
							...style.itemImg,
						}}
					>
						<div className="distance">
							<i className="fa fa-pin" />
							Featured Food
						</div>
					</div>
					<div className="content popular-item-content">
						<h5>{item.name}</h5>
						<div className="product-name">{item.title}</div>
						<div className="d-flex justify-content-between price-btn-block align-items-center item-buttons">
							<span className="price">
								<span className="rupee-symbol">&#8377;</span>
								{item.price}
							</span>
							<div className="">
								{getCartItemQuantity(item.id) > 0 ? (
									<div
										className="input-group"
										//  style={{marginTop:'8px',marginBottom:'8px'}}
									>
										<span className="input-group-btn">
											<button
												type="button"
												className="btn btn-sm theme-btn btn-number"
												data-type="minus"
												data-field="quant[2]"
												disabled={
													!(
														getCartItemQuantity(
															item.id
														) > 0
													)
												}
												onClick={() =>
													decreaseCartItemQuantity(
														item.id
													)
												}
											>
												<i
													className="fa fa-minus"
													aria-hidden="true"
												></i>
											</button>
										</span>
										<p className="mb-0 btn-quantity">
											{getCartItemQuantity(item.id)}
										</p>
										<span className="input-group-btn">
											<button
												type="button"
												className="btn btn-sm btn-success btn-number"
												data-type="plus"
												data-field="quant[2]"
												// disabled={
												// 	!(
												// 		props.getCartItemQuantity(
												// 			props.food.id
												// 		) < props.food.quantity
												// 	)
												// }
												onClick={() =>
													increaseCartItemQuantity(
														item.id
													)
												}
											>
												<i
													className="fa fa-plus"
													aria-hidden="true"
												></i>
											</button>
										</span>
									</div>
								) : (
									<button
										// href="#"
										className="btn theme-btn-dash pull-right"
										// data-toggle="modal"
										// data-target="#order-modal"
										onClick={() => {
											addProductToCart(item);
										}}
									>
										Add to Cart
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	});
	return (
		<div className="about-us border-none">
			<RestaurantProfile />
			<section className="featured-restaurants f-restaurant">
				<div className="container">
					<section className="add-restaurants">
						<div className="container px-0">
							<h1 className="text-center mb-3">
								Quick and easy way to place order
							</h1>
							<div className="row align-items-center d-flex">
								<div className="col-xs-6 col-sm-6 join-text text-center">
									<p className="lead my-1 text-muted">
										Click Button To Order Food
									</p>
								</div>
								<div className="col-xs-6 col-sm-6 join-text text-center">
									<p className="lead my-1 text-muted">
										Scan QR Code To Order Food
									</p>
								</div>
							</div>
							<div className="row align-items-center d-flex">
								<div className="col-xs-6 col-sm-6 join-text text-center">
									{/* <p className="my-1">
										Click Button To Order Food
									</p> */}
									<Link
										to={`${url}/order-online`}
										className="btn theme-btn btn-lg"
									>
										Order Now
									</Link>
								</div>
								<div className="col-xs-6 col-sm-6 join-btn text-center barcode-col">
									{/* <p className="my-1">
										Scan QR code to order food{" "}
									</p> */}
									<div id="barcode" className="barcode-img mx-auto">
										<img
											className="img-fluid"
											src={qrCodeURL}
											alt="QR code"
											onError={onDefaultSrc}
										/>
									</div>
								</div>
							</div>
						</div>
					</section>
					{/* <!-- add restaurant ends --> */}
				</div>
				<div className="container mt-3">
					<div className="title text-xs-center m-b-30">
						<h2>Popular This Month In Your City</h2>
						<p className="lead">
							The easiest way to your favourite food
						</p>
					</div>
					<div className="row">
						{/* Each popular food item starts */}

						{popularFoods.length > 0 ? (
							popularFoods
						) : (
							<p className="text-center">No Items </p>
						)}
					</div>
				</div>
			</section>
			{/* <!-- Featured restaurants ends --> */}
		</div>
	);
};

export default RestaurantHome;
