import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import defaultImg from "../../images/image-not-found1.png";
import RestauranCarousel from "../RestaurantCarousel/RestauranCarousel";
import About from "../../Containers/About/About";
import "./RestaurantProfile.css";

const RestaurantProfile = () => {
	// console.log('props[restauranProfile.js]',props);
	const restaurantState = useSelector((state) => state.restaurantReducer);
	const [resIsOpen, setResIsOpen] = useState(false);
	const { restaurantProfile, restaurantIsOpen } = restaurantState;
	useEffect(()=>{
		setResIsOpen(restaurantIsOpen);
	},[restaurantIsOpen])

	const backgroundBannerUrl = `http://www.adiyogitechnosoft.com/restaurant/uploads/restaurant/${restaurantProfile.unique_id}/${restaurantProfile.img}`;

	const logoUrl = `http://www.adiyogitechnosoft.com/restaurant/uploads/restaurant/${restaurantProfile.unique_id}/${restaurantProfile.logo}`;
	console.log("[FoodOrderOnline.js]", restaurantProfile);
	const defaultImageSrc = (ev) => {
		ev.target.src = defaultImg;
	};
	const style = {
		restaurantName: {
			fontSize: "55px",
		},
	};
	console.log("restaurantProfile [restaurantProfile.js]", restaurantProfile);
	return (
		<div className="profile">
			<div className="" style={{ position: "relative" }}>
				<RestauranCarousel />
				<div className="pull-left right-text white-txt restaurant-bio">
					<h1 className="text-white font-weight-bold restauran-name">
						{restaurantProfile && restaurantProfile.name}
					</h1>

					<p className="text-white">
						{restaurantProfile && restaurantProfile.title}
					</p>
					<p className="">
						Status : {resIsOpen ? "Open" : "Closed"}
					</p>
					<p className="">
						Time : {restaurantProfile.opentime.slice(0, 5)} to{" "}
						{restaurantProfile.closetime.slice(0, 5)}
					</p>
				</div>

				{/*				<div className="row">
					<div className="col-xs-12 col-sm-12  col-md-4 col-lg-4 profile-img">
 							<div className="image-wrap">
								<figure>
									<img
										onError={defaultImageSrc}
										src={logoUrl}
										alt="Profile"
										width="240"
										height="140"
									/>
								</figure>
							</div>
					</div>
					<div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 profile-desc">
					
					</div>
				</div>
	 */}
			</div>
		</div>
	);
};

export default RestaurantProfile;
