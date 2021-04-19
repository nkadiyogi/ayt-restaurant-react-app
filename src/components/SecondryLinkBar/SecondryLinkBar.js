import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SecondryLinkBar = (props) => {
	const restaurantsState = useSelector((state) => state.restaurantsReducer);
	console.log("SecondryLinkBar url path", props);
	console.log("SecondryLinkBar restaurantsState current page", restaurantsState.currentPage);
	return (
		<div className="top-links">
			<div className="container">
				<ul className="row links">
					<li
						className={`col-xs-12 col-sm-3 link-item ${
							restaurantsState.currentPage == "/" ||
							restaurantsState.currentPage == "/checkout"
								? "active"
								: ""
						}`}
					>
						<span>1</span>
						<Link to="/">Choose Your Location</Link>
					</li>
					<li
						className={`col-xs-12 col-sm-3 link-item ${
							restaurantsState.currentPage == "/restaurants" ||
							restaurantsState.currentPage == "/checkout"
								? "active"
								: ""
						}`}
					>
						<span>2</span>
						<Link
							to={`/restaurants/?searchterm=${restaurantsState.searchText}`}
						>
							Choose Restaurant
						</Link>
					</li>
					<li
						className={`col-xs-12 col-sm-3 link-item ${
							restaurantsState.currentPage ==
								"/restaurant-profile" ||
							restaurantsState.currentPage == "/checkout"
								? "active"
								: ""
						}`}
					>
						<span>3</span>
						<Link to="/restaurant-profile">
							Pick Your favorite food
						</Link>
					</li>
					<li
						className={`col-xs-12 col-sm-3 link-item ${
							restaurantsState.currentPage == "/checkout"
								? "active"
								: ""
						}`}
					>
						<span>4</span>
						<Link to="/checkout">Order and Pay online</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default SecondryLinkBar;
