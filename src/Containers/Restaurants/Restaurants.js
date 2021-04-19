import React, { useEffect, useState } from "react";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import RestaurantsSideBar from "../../components/RestaurantsSideBar/RestaurantsSideBar";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
	updateSecondryLink,
	getRestaurantCategory,
} from "../../redux/Restaurants/action";
import * as actionTypes from "../../redux/Restaurant/actionTypes";
import headBanner from "../../images/bg-restaurants-rod-long-WC7LeX79iEU-unsplash.jpg";
// container component for retaurant list
const Restaurants = (props) => {
	const restaurantsState = useSelector((state) => state.restaurantsReducer);
	const cartState = useSelector((state) => state.cartReducer);

	const [searchTerm, setSearchTerm] = useState("");
	const location = useLocation();

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getRestaurantCategory());
	}, []);
	useEffect(() => {
		// console.log("component did mount");
		// get search string from url
		let searchText = location.search.split("=")[1];
		if (searchText) searchText = searchText.toLowerCase();
		// set search term
		setSearchTerm(searchText);
		dispatch(updateSecondryLink("/restaurants"));
	}, [searchTerm]);

	console.log("useLocation--  ", location);
	console.log("restaurantsReducer ", restaurantsState);

	// filter restaurants based on search text
	let filteredRestaurants = restaurantsState.restaurantList.filter(
		(restaurant) => restaurant.name.toLowerCase().includes(searchTerm)
	);
	if (restaurantsState.selectedRestaurantCateId != "") {
		filteredRestaurants = filteredRestaurants.filter(
			(restaurant) =>
				restaurant.rest_cat_id ==
				restaurantsState.selectedRestaurantCateId
		);
	}
	// method called when user choose restaurant from list
	// set state for selected restaurant and products
	const getRestaurant = (restaurantId) => {
		const resDetails =
			restaurantsState &&
			restaurantsState.restaurantList.find(
				(resObj) => resObj.unique_id == restaurantId
			);
		// console.log("resDetails [Restaurant/action.js]", resDetails);
		dispatch({
			type: actionTypes.RESTAURANT_SUCCESS,
			payload: resDetails,
		});
	};

	// map jsx to restaurant list
	const restaurantsList =
		filteredRestaurants &&
		filteredRestaurants.map((res, index) => (
			<RestaurantCard
				key={index}
				restaurantData={res}
				getRestaurant={getRestaurant}
			/>
		));

	return (
		<div className="container">
			<div
				class="inner-page-hero bg-image"
				data-image-src={headBanner}
				style={{
					background: `url(${headBanner}) center center / cover no-repeat`,
					// "url('http://placehold.it/1670x480') center center / cover no-repeat",
				}}
			>
				<div class="container"> </div>
			</div>
			<div class="result-show">
				<div class="container">
					<div class="row">
						<div class="col-sm-3">
							<p>
								<span class="primary-color">
									<strong className="mr-1">
										{filteredRestaurants &&
											filteredRestaurants.length}
									</strong>
								</span>
								Results so far
							</p>
						</div>
						<p></p>
						{/* <div class="col-sm-9">
							<select class="custom-select pull-right">
								<option selected="">
									Open this select menu
								</option>
								<option value="1">One</option>
								<option value="2">Two</option>
								<option value="3">Three</option>
							</select>
						</div> */}
					</div>
				</div>
			</div>
			<div className="row ">
				<div className="col-xs-12 col-sm-5 col-md-5 col-lg-3">
					<RestaurantsSideBar />
				</div>
				<div className="col-xs-12 col-sm-7 col-md-7 col-lg-9">
					{restaurantsList.length > 0 ? restaurantsList : <p className="text-center">No Restaurant found!</p> }
				</div>
			</div>
		</div>
	);
};

export default Restaurants;
