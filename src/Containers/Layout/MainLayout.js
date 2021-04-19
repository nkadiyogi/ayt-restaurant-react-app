import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch,useRouteMatch,useHistory} from "react-router-dom";
// import User from "./components/Test/User";
import Home from "../Home/Home";
import About from "../About/About";
import MainHeader from "../MainHeader/MainHeader";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import Restaurants from "../Restaurants/Restaurants";

import Restaurant from "../Restaurant/Restaurant";
import Cart from "../Cart/Cart";
import Checkout from "../Checkout/Checkout";
import SecondryLinkBar from "../../components/SecondryLinkBar/SecondryLinkBar";
import Signup from "../../components/SignUp/Signup";
import Login from "../../components/Login/Login";
import UserAccount from "../UserAccount/UserAccount";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import "../../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getRestaurants } from "../../redux/Restaurants/action";
import RestaurantHeader from "../../components/RestaurantHeader/RestaurantHeader";
import {
	getAllCityList,
	getAllCountryList,
	getAllStateList,
} from "../../redux/app/action";
import{ restauratDomanName} from '../../envVariables';
import PageNotFound from '../../components/404PageNotFound/404PageNotFound';
const MainLayout = () => {
	const dispatch = useDispatch();
	const restaurantsState = useSelector((state) => state.restaurantsReducer);
	const appState = useSelector((state) => state.appReducer);
	useEffect(() => {
		console.log("component did mount [mainLayout.js]");
		dispatch(getRestaurants());
		dispatch(getAllCityList());
		dispatch(getAllStateList());
		dispatch(getAllCountryList());
	}, []);
	const {url,path} = useRouteMatch();
	const history = useHistory();
	const isLoggedIn = appState && appState.loggedIn;
	console.log('location [MainLayout.js]',history);
	return (
		<div className="">
			<div className="container-fluid px-0">
				<Switch>
					<Route
						path="/restaurant/:restaurantUrl"
						component={Restaurant}
					/>
					<Route path="/" component={PageNotFound} />
				</Switch>
			</div>
			<ToastContainer />
		</div>
	);
};

export default MainLayout;
