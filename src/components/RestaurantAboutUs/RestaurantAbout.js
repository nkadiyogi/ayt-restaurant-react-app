import React, { useState, useEffect } from "react";
import RestaurantAboutView from "./RestaurantAboutView";
import { getAboutData } from "./api";
import { notify } from "../AlertNotification/util";
import { useSelector } from "react-redux";

const RestaurantAbout = () => {
	const [loading, setLoading] = useState(false);
	const [aboutUsData, setAboutUsData] = useState({});
	const restaurantState = useSelector((state) => state.restaurantReducer);

	useEffect(() => {
		getAbout();
	}, []);
	const { restaurantProfile } = restaurantState;
	const getAbout = () => {
		getAboutData(restaurantProfile.unique_id)
			.then((result) => {
				setLoading(false);
				if (result.status == false) {
					console.log("error", result);
					return notify("getting error !!" + result.msg, "warn");
				}
				setAboutUsData(result.data[0]);
				console.log("res Aboutus result", result.data[0]);
			})
			.catch((err) => {
				setLoading(false);
				console.log("err", err);
				notify("getting error !!" + err.messege, "warn");
			});
	};
	return (
		<div>
			<RestaurantAboutView aboutUsData={aboutUsData}/>
		</div>
	);
};

export default RestaurantAbout;
