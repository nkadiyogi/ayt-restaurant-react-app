import React from "react";
import "./RestaurantMenu.css";
import MenuCard from "./MenuCard/MenuCard";
import { useSelector } from "react-redux";
const RestaurantMenu = () => {
	const restaurantState = useSelector((state) => state.restaurantReducer);
	const { productCategory } = restaurantState;
	const list = productCategory.map((cate, index) => (
		<MenuCard key={index} category={cate} i={index} />
	));

	return (
		<div
			className="menu-container mt-2"
			style={{ minHeight: "300px" }}
		>
			<div className="row m-t-30 mx-0 py-2">
				<h2 className="pl-3">Restaurant Menu</h2>
				<div className="menu-card-container">{list}</div>
			</div>
		</div>
	);
};

export default RestaurantMenu;
