import React, { useEffect, useRef ,useState} from "react";

import { useSelector, useDispatch } from "react-redux";
import { useLocation, Switch, Route, useRouteMatch } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";
import "./Restaurant.css";
// import { updateSecondryLink } from "../../redux/Restaurants/action";
import OrderOnlineFood from "../../components/RestaurantOrderOnline/FoodItemsOrderOnline";
import RestaurantMenu from "../../components/RestaurantMenu/RestaurantMenu";
import RestaurantHome from "../../components/RestaurantHome/RestaurantHome";
import Checkout from "../Checkout/Checkout";
import UserAccount from "../UserAccount/UserAccount";
import RestaurantHeader from "../../components/RestaurantHeader/RestaurantHeader";
import Cart from "../Cart/Cart";
import {
	getRestaurantProductsCategory,
	getRestaurantByURL,
	changeRestaurantStatus,
} from "../../redux/Restaurant/action";
import {
	setOrderMode,
	getTableData,
	resetTableData,
	clearCart,
} from "../../redux/Cart/action";
import { checkRestaurantIsOpen } from "./util/utils";
import RestaurantContactUs from "../../components/RestaurantContactUs/RestaurantContactUs";
import ModalView from "../../components/Modal/ModalView";
import RestaurantAbout from "../../components/RestaurantAboutUs/RestaurantAbout";
import PageNotFound from "../../components/404PageNotFound/404PageNotFound";
import RestaurantFooter from "../../components/RestaurantFooter/RestaurantFooter";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import LoginContainer from "../../components/Login/LoginContainer";
import SignupContainer from "../../components/SignUp/SignUpContainer";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import Unauthorized from '../../components/UnauthorizedPage/Unauthorized';
import * as cartActionTypes from "../../redux/Cart/actionTypes";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const Restaurant = (props) => {
	const cartState = useSelector((state) => state.cartReducer);
	const restaurantState = useSelector((state) => state.restaurantReducer);
	const appState = useSelector((state) => state.appReducer);
	const location = useLocation();
	const dispatch = useDispatch();
	const [modalOpen, setModalOpen] = useState(false);
	const {
		products,
		restaurantProfile,
		restaurantIsOpen,
		loading,
		restaurantLoader,
	} = restaurantState;
	useEffect(() => {
		// set restaurant state
		dispatch(getRestaurantByURL(props.match.params.restaurantUrl));
		dispatch(getRestaurantProductsCategory());
		console.log("component did mount[Restaurant.js]",location);
		setTableQueryStringFromUrl();
		// dispatch(updateSecondryLink("/restaurant"));
		// props.getRestaurant(restaurantData.unique_id);
		// // dispatch(getRestaurantProducts(restaurantData.unique_id));
		// dispatch(setRestaurantId(restaurantData.unique_id));
		window.scrollTo(0, 0);
	}, []);
	useEffect(() => {
		// open = true
		let restaurantStatus = checkRestaurantIsOpen(
			restaurantProfile.opentime,
			restaurantProfile.closetime
		);
		// console.log('resIsOpen[restaurant.js]',restaurantStatus, restaurantIsOpen);
		if (restaurantStatus && !restaurantIsOpen) {
			dispatch(changeRestaurantStatus(true));
		}
		if (!restaurantStatus && restaurantIsOpen) {
			dispatch(changeRestaurantStatus(false));
		}
		return () => {
			//
		};
		// setInterval(() => {
		// 	open = true
		// 	let restaurantStatus = checkRestaurantIsOpen(
		// 		restaurantProfile.opentime,
		// 		restaurantProfile.closetime
		// 	);
		// 	// res= true, state = true
		// 	console.log('resIsOpen[restaurant.js]',restaurantStatus, restaurantIsOpen);
		// 	if (restaurantStatus && !restaurantIsOpen) {
		// 		dispatch(changeRestaurantStatus(true));
		// 	}
		// 	if (!restaurantStatus && restaurantIsOpen) {
		// 		dispatch(changeRestaurantStatus(false));
		// 	}
		// }, 1000);
	}, [restaurantProfile]);
	const { table, orderMode } = cartState;
	const setTableQueryStringFromUrl = () => {
		const tableNoQueryString = location.search
			.slice(1)
			.split("&")
			.find((param) => param.split("=")[0] == "tblno");
			let tblNo =null;
		if (tableNoQueryString) {
			 tblNo = tableNoQueryString.split("=")[1];
			if (tblNo) {
				dispatch(getTableData(tblNo, "restaurantid"));
				dispatch(
					setOrderMode(cartActionTypes.ORDER_MODE_ID_BOOK_TABLE)
				);
			}
		}
		if (!tblNo && orderMode == cartActionTypes.ORDER_MODE_ID_BOOK_TABLE) {
			dispatch(setOrderMode(null));
		}
		// console.log("order-online url", location);
		// console.log("order-online tableNoQueryString ", tableNoQueryString);
	};
	if (table.error && table.tableData.tableNo && !modalOpen) {
		setModalOpen(true);
	}
	

	const onOpenModal = () => {
		setModalOpen(true);
	};
	const onCloseModal = () => {
		setModalOpen(false);
		dispatch(clearCart());
	};
	const { path, url } = useRouteMatch();
	const getSliderData = (restaurantId) => {};
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
				console.log(
					"types iof ",
					typeof itemObj.item.price,
					typeof itemObj.quantity
				);
				total =
					total +
					Number(itemObj.item.price) * Number(itemObj.quantity);
			});
		return total;
	};
	// console.log("props", props);
	const currentPath = props.match.path;
	const locationPathName = location.pathname;
	// console.log("currentPath,",locationPathName == `${currentPath}/res-about-us`);
	const style = {
		activeLink: {
			borderBottom: "2px solid tomato",
		},
	};

	// check restaurant open closed status based on restaurant time
	// console.log(" location [Restaurant.js]", location.pathname);
	const isLoggedIn = appState && appState.loggedIn;

	// set app title based on restaurant Name
	if (document && restaurantProfile && restaurantProfile.name) {
		document.title = restaurantProfile.name;
	}

	// console.log('[Restaurant.js] did update')
	// when restaurant not found get 404 page
	// app loading it shows loading screen
	return restaurantState.resNotFound ? (
		<PageNotFound />
	) : restaurantLoader === true ? (
		<LoadingScreen />
	) : (
		<div className="">
			{/* restaurant header */}
			<RestaurantHeader {...props} />
			{/* <h2>Restaurant profile</h2>className */}
			<div className="">
				{/* <OrderOnlineFood /> */}
				{/* <RestaurantMenu />  */}
				<div className="">
					<Switch>
						<Route
							exact
							path={`${url}/contact`}
							component={() => <h3>Restaurant contact us</h3>}
						/>
						<Route
							exact
							path={`${url}/order-online`}
							component={OrderOnlineFood}
						/>
						<Route
							exact
							path={`${url}/food-menu`}
							component={RestaurantMenu}
						/>
						<PrivateRoute path={`${url}/user-account`} component={UserAccount}/>
						
						<Route
							exact
							path={`${url}/checkout`}
							component={Checkout}
						/>
						<Route
							exact
							path={`${url}/contact-us`}
							component={RestaurantContactUs}
						/>
						<Route
							exact
							path={`${url}/about-us`}
							component={RestaurantAbout}
						/>
						<Route exact path={`${url}/log-in`}>
							{!isLoggedIn ? (
								<LoginContainer />
							) : (
								<Redirect to={url} />
							)}
						</Route>
						<Route exact path={`${url}/signup`}>
							{!isLoggedIn ? (
								<SignupContainer />
							) : (
								<Redirect to={url} />
							)}
						</Route>
						<Route
							exact
							path={`${url}`}
							component={RestaurantHome}
						/>
						<Route
							exact
							path={`${url}/unauthorized`}
							component={Unauthorized}
						/>
					</Switch>
				</div>
			</div>
			{/* {	restaurantLoader && <ModalView show> <div className="" 
		// style={{minHeight:'200px',minWidth:'200px'}}
		> <div className="loader"></div> </div></ModalView>} */}
			{location.pathname != `${url}/checkout` && (
				<Link
					className="bg-success sticky-cart-button"
					to={`${url}/checkout`}
				>
					<p className="text-white mb-0 text-center">
						Cart Items({getCartAllItemQuantity()}), Total Amount:
						<span>&#8377;</span> {getCartItemTotalAmount()}
					</p>
				</Link>
			)}
			<Modal
				open={modalOpen && !table.loading}
				onClose={onCloseModal}
				center
				classNames={{
					overlay: "customOverlay",
					modal: "customModal",
				}}
			>
				<h4>Getting Error {table.error}</h4>
			</Modal>
			<RestaurantFooter
				profile={restaurantProfile}
				locationHistory={props}
				foodProducts={products}
			/>

		</div>
	);
};

export default Restaurant;
