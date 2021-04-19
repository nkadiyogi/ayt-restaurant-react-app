import React from "react";
import { Link } from "react-router-dom";

import { useDispatch,useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'

import { setRestaurantId, clearCart } from '../../redux/Cart/action';
const RestaurantCard = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const cartState = useSelector((state) => state.cartReducer);
	const { restaurantData } = props;
	
	// when choose diffrent restaurant ,confirm yes to clear cart
	const onSelectRestaurant = ()=> {
		// console.log(cartState.restaurantId ,restaurantData.unique_id)

		if( cartState.restaurantId == '' || cartState.restaurantId == restaurantData.unique_id || cartState.cartItems.length == 0 || window.confirm("Another restaurant item already have in cart ,want to clear cart and  start with fresh")){
			
			if(cartState.restaurantId != '' && cartState.restaurantId != restaurantData.unique_id && cartState.cartItems.length > 0) {
					dispatch(clearCart())
			}
			// props.getRestaurant(restaurantData.unique_id);
			// // dispatch(getRestaurantProducts(restaurantData.unique_id));
			// dispatch(setRestaurantId(restaurantData.unique_id));
			history.push(`/restaurant/${restaurantData.url}`)
		}
	}

	const logoUrl = `http://www.adiyogitechnosoft.com/restaurant/uploads/restaurant/${restaurantData.unique_id}/${restaurantData.logo}`;

	return (
		<div className="bg-gray restaurant-entry">
			<div className="row">
				<div className="col-sm-12 col-md-12 col-lg-8 text-xs-center text-sm-left">
					<div className="entry-logo">
						<a className="img-fluid" href="#">
							<img
								src={logoUrl}
								alt="Food logo"
								width="100"
								height="80"
							/>
						</a>
					</div>
					{/* <!-- end:Logo --> */}
					<div className="entry-dscr">
						<h5>
							<a href="#">{restaurantData.name}</a>
						</h5>
						<span>
							{restaurantData.title} <a href="#">...</a>
						</span>
						<ul className="list-inline">
							<li className="list-inline-item">
								<i className="fa fa-check"></i> Min ${" "}
								{restaurantData.min_booking}
							</li>
							<li className="list-inline-item">
								<i className="fa fa-motorcycle"></i> 30 min
							</li>
						</ul>
					</div>
					{/* <!-- end:Entry description --> */}
				</div>
				<div className="col-sm-12 col-md-12 col-lg-4 text-xs-center">
					<div className="right-content bg-white">
						<div className="right-review">
							<div className="rating-block">
								<i className="fa fa-star"></i>
								<i className="fa fa-star"></i>
								<i className="fa fa-star"></i>
								<i className="fa fa-star"></i>
								<i className="fa fa-star-o"></i>
							</div>
							<p> 245 Reviews</p>
							<button
								onClick={onSelectRestaurant}
								className="btn theme-btn-dash"
							>
								View Menu
							</button>
						</div>
					</div>
					{/* <!-- end:right info --> */}
				</div>
			</div>
			{/* <!--end:row --> */}
		</div>
	);
};

export default RestaurantCard;
