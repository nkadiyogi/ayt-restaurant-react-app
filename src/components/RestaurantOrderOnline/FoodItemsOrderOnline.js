import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useRouteMatch } from "react-router-dom";
import FoodItemCard from "../../components/FoodItemCard/FoodItemCard";
import { getRestaurantProducts } from "../../redux/Restaurant/action";
import {
	addToCart,
	increaseItemQuantity,
	decreaseItemQuantity,
	setOrderMode,
	getTableData,
	resetTableData,
	clearCart,
} from "../../redux/Cart/action";
import "../../Containers/Restaurant/Restaurant.css";
import Spinner from "../../components/Spinner/Spinner";
import {
	setProductCategory,
	clearProCategoryFilter,
} from "../../redux/Restaurant/action";

import CartItems from "../../components/cartItems/CartItems";
import { notify } from "../AlertNotification/util";
import RestaurantProfile from "../RestaurantProfile/RestaurantProfile";
import "./FoodOrderOnline.css";
import bgImage from "../../images/Carasual_img/slider1.jpg";
import defaultImg from "../../images/image-not-found1.png";
import defaultBg from "../../images/not-found-image-full-width.jpg";


const OnlineProducts = (props) => {
	const restaurantState = useSelector((state) => state.restaurantReducer);
	const cartState = useSelector((state) => state.cartReducer);
	const [foodCategory, setFoodCategory] = useState(null);
	const dispatch = useDispatch();
	const location = useLocation();
	const [searchItem, setSearchItem] = useState("");
	
	
	useEffect(() => {
		// set restaurant state
		window.scrollTo(0, 0);
		console.log("[food orderonline.js]component did mount");
		// dispatch(getRestaurantProducts(cartState.restaurantId));
	
	}, []);
	const { table, orderMode } = cartState;
	const onInputChange = (e) => setSearchItem(e.target.value);

	const addProductToCart = (item) => {
		dispatch(addToCart(item));
	};
	// get cart item quantity
	const getCartItemQuanity = (itemId) => {
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

	// filter items---------------------------
	let filterdProducts =
		restaurantState.products &&
		restaurantState.products.filter(
			(product) =>
				restaurantState.selectedProductCategoryId ==
					product.category_id ||
				restaurantState.selectedProductCategoryId == ""
		);
	if (searchItem.length > 0) {
		filterdProducts = filterdProducts.filter((product) =>
			product.name.toLowerCase().includes(searchItem.toLowerCase())
		);
	}
	// map jsx
	const restaurantFoodProducts =
		filterdProducts &&
		filterdProducts.map((proObj, index) => {
			return (
				<FoodItemCard
					key={index}
					food={proObj}
					addToCart={addProductToCart}
					getCartItemQuantity={getCartItemQuanity}
					increaseQuantity={increaseCartItemQuantity}
					decreaseQuantity={decreaseCartItemQuantity}
				/>
			);
		});

	//food category filter list---------------
	let categoryList =
		restaurantState &&
		restaurantState.productCategory.map((category, index) => (
			<li
				key={index}
				className={`list-group-item ${
					restaurantState.selectedProductCategoryId == category.id
						? "active"
						: ""
				}`}
				onClick={() => dispatch(setProductCategory(category.id))}
				role="button"
			>
				{category.name}
			</li>
		));
	categoryList = (
		<ul className="list-group category-list">
			<li
				className={`list-group-item ${
					restaurantState.selectedProductCategoryId == ""
						? "active"
						: ""
				}`}
				onClick={() => dispatch(clearProCategoryFilter())}
				role="button"
			>
				All Items
			</li>
			{categoryList ? categoryList : <p>No Food Category Available</p>}
		</ul>
	);

	const categorySelect = (
		<select
			className="form-control category-select"
			value={restaurantState.selectedProductCategoryId}
			onChange={(e) => dispatch(setProductCategory(e.target.value))}
		>
			<option value="">ALL Items</option>
			{restaurantState &&
				restaurantState.productCategory.map((category, index) => (
					<option key={index} value={category.id}>
						{category.name}
					</option>
				))}
		</select>
	);

	const style = {
		minHeight: "370px",
		productsHeading: {
			font: "18px Arial, sans-serif",
		},
	};
	const {
		restaurantProfile,
		restaurantIsOpen,
		restaurantLoader,
	} = restaurantState;
	const { name, title, min_booking } = restaurantProfile;
	const backgroundBannerUrl = `http://www.adiyogitechnosoft.com/restaurant/uploads/restaurant/${restaurantProfile.unique_id}/${restaurantProfile.img}`;

	const logoUrl = `http://www.adiyogitechnosoft.com/restaurant/uploads/restaurant/${restaurantProfile.unique_id}/${restaurantProfile.logo}`;
	console.log("[FoodOrderOnline.js]", restaurantProfile);
	const defaultImageSrc = (ev) => (ev.target.src = defaultImg);
	
	return (
		<div className="">
			<section
				className="inner-page-hero bg-image order-page-banner"
				data-image-src={bgImage}
				style={{
					background: `url(${backgroundBannerUrl}) center center / cover no-repeat,url(${defaultBg}) center center / cover no-repeat`,
				}}
			>
				<div className="profile">
					<div className="container">
						<div className=" profile-desc">
							<div className="pull-left restaurant-bio right-text white-txt res-des">
								<h1 className="text-white font-weight-bold restauran-name">
									{name}
								</h1>
								<p>{title}</p>
								<p className="">
									Status :
									{restaurantIsOpen ? "Open" : "Closed"}
								</p>
								<p className="">
									Time :
									{restaurantProfile.opentime.slice(0, 5)} to{" "}
									{restaurantProfile.closetime.slice(0, 5)}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className="mt-2">
				<div class="title text-xs-center m-b-30">
					<h2>Choose Tasty Dishes</h2>
					<p class="lead">The easiest way to your favourite food</p>
				</div>
			</div>
			<div className="container">
				<div className="col-xs-6 col-sm-4 col-md-4 col-lg-3 search-food">
					<div class="form-inline">
						<div class="form-group">
							<div class="custom-header sidebar-title white-txt">
								<h6>Search Food</h6>
								<i class="fa fa-cutlery pull-right"></i>
							</div>
							<div class="form-group">
								<input
									type="text"
									class="form-control form-control-lg input-search"
									// id="exampleInputAmount"
									value={searchItem}
									onChange={onInputChange}
									placeholder="I would like to eat...."
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xs-6 col-sm-4 col-md-4 col-lg-3 custom-scroll">
					<div className="sidebar clearfix m-b-20">
						<div className="main-block">
							<div className="sidebar-title white-txt custom-header">
								<h6>Choose Cusine</h6>{" "}
								{restaurantLoader ||
									(table.loading && (
										<div className="loader"></div>
									))}
								<i className="fa fa-cutlery pull-right" />
							</div>
							{categoryList}
							{categorySelect}
							<div className="clearfix" />
						</div>
						{/* end:Sidebar nav */}
					</div>
					{/* end:Left Sidebar */}
				</div>
				<div className="col-xs-12 col-sm-8 col-md-8 col-lg-6 custom-scroll">
					<div className="menu-widget m-b-30">
						<div className="collapse in" id={1}>
							{/* popular food items */}
							{restaurantState.productLoader ? (
								<p className="align-items-center d-flex justify-content-center my-1 text-center">
									<div className="loader mr-1"></div>{" "}
									Loading...
								</p>
							) : restaurantFoodProducts.length > 0 ? (
								restaurantFoodProducts
							) : (
								<h5 className="text-center py-1">
									No item found!
								</h5>
							)}

							{/* end:Food item */}
						</div>
						{/* end:Collapse */}
					</div>
					{/* end:Widget menu */}
				</div>
				<div className="col-xs-12 col-md-12 col-lg-3 order-cart">
					<CartItems />
				</div>
				{/* end:Bar */}
			</div>

			{/* end:row */}
			
		</div>
	);
};
export default OnlineProducts;
