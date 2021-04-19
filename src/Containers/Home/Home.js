import React, { useEffect } from "react";
import SearchRestaurant from "../../components/SearchRestaurant/SearchRestaurant";
import PopularRestaurant from "../../components/PopularRestaurant/PopularRestaurant";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import FeaturedRestaurant from "../../components/FeaturedRestaurant/FeaturedRestaurant";
import { useDispatch,useSelector } from "react-redux";
import { getRestaurants } from "../../redux/Restaurants/action";
import { updateSecondryLink } from "../../redux/Restaurants/action";
import { getAllCityList } from "../../redux/app/action";
import { setRestaurant,getRestaurantProducts } from "../../redux/Restaurant/action";
import { setRestaurantId } from '../../redux/Cart/action';

const Home = () => {
	const dispatch = useDispatch();
	const restaurantsState = useSelector((state) => state.restaurantsReducer);
	useEffect(() => {
		console.log("component did mount [Home.js]");
		dispatch(getRestaurants());
		dispatch(getAllCityList());
		dispatch(updateSecondryLink("/"));
	}, []);

	return (
		<div className="">
			<SearchRestaurant />
			{/* <div className="mt-2">
				<PopularRestaurant />
			</div> */}
			<HowItWorks />
			{/* <FeaturedRestaurant /> */}
		</div>
	);
};
export default Home;
