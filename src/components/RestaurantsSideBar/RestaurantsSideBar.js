import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setRestaurantCategory,
	clearRestaurantCategoryFilter,
} from "../../redux/Restaurants/action";

const RestaurantsSideBar = () => {
	const dispatch = useDispatch();
	const restaurantsState = useSelector((state) => state.restaurantsReducer);

	const categoryList =
		restaurantsState &&
		restaurantsState.restaurantCategory.map((category, index) => (
			<li
				key={index}
				className={`list-group-item ${
					restaurantsState.selectedRestaurantCateId == category.id
						? "active"
						: ""
				}`}
				onClick={() => dispatch(setRestaurantCategory(category.id))}
				role="button"
			>
				{category.name}
			</li>
		));

	return (
		<>
			<div className="sidebar clearfix m-b-20">
				<div className="main-block">
					<div className="sidebar-title white-txt">
						<h6>Choose Cusine</h6>
						<i className="fa fa-cutlery pull-right" />
					</div>
					<form>
						<ul className="list-group">
							<li
								className={`list-group-item ${
									restaurantsState.selectedRestaurantCateId ==
									""
										? "active"
										: ""
								}`}
								onClick={() =>
									dispatch(clearRestaurantCategoryFilter())
								}
								role="button"
							>
								All items
							</li>
							{categoryList.length > 0 ? (
								categoryList
							) : (
								<p> No category found!</p>
							)}
						</ul>
					</form>
					<div className="clearfix" />
				</div>
			</div>
			{/* end:Sidebar nav */}
		</>
	);
};
export default RestaurantsSideBar;
