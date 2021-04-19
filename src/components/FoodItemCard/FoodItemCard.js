import React from "react";
import { useDispatch } from "react-redux";
import defaultImg from "../../images/image-not-found1.png";
import "./FoodItemCard.css";
const FoodItemCard = (props) => {
	const dispatch = useDispatch();
	// console.log("props[FoodItemCard.js]", props);

	const logoUrl = `http://adiyogitechnosoft.com/restaurant/${props.food.image_path}/${props.food.img}`;
	const setDefaultImg = (e) => (e.target.src = defaultImg);
	console.log("props.food ", props.food);
	const style = {
		btnControls: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			height: "40px",
		},
	};
	return (
		<div className="food-item white">
			<div className="row box-shadow-sm pb-1">
				<div className="col-xs-12 col-sm-12 col-lg-7 col-xl-8">
					<div className="rest-logo pull-left">
						<a className="restaurant-logo pull-left" href="#">
							<img
								onError={setDefaultImg}
								className="food-img"
								src={logoUrl}
								alt="Food logo"
								width="80"
								height="80"
							/>
						</a>
					</div>
					{/* <!-- end:Logo --> */}
					<div className="rest-descr">
						<h6 className="">{props.food.name}</h6>
						<p> {props.food.title}</p>
					</div>
					{/* <!-- end:Description --> */}
				</div>
				{/* <!-- end:col --> */}
				<div className="col-lg-4 col-xl-4 col-sm-12 col-xs-12 item-cart-info pull-right">
					<div className="d-flex" style={style.btnControls}>
						<div className="">
							<p className="price pull-left mb-0 rupee-content">
								<span className="font-weight-normal rupee-sym">
									&#8377;
								</span>
								{props.food.price}
							</p>
						</div>
						<div className="">
							{props.getCartItemQuantity(props.food.id) > 0 ? (
								<div className="input-group">
									<span className="input-group-btn">
										<button
											type="button"
											className="btn btn-sm theme-btn btn-number"
											data-type="minus"
											data-field="quant[2]"
											disabled={
													props.getCartItemQuantity(
														props.food.id
													) <1
												
											}
											onClick={() =>
												props.decreaseQuantity(
													props.food.id
												)
											}
										>
											<i
												className="fa fa-minus"
												aria-hidden="true"
											></i>
										</button>
									</span>
									<p className="mb-0 py-1 btn-quantity">
										{props.getCartItemQuantity(
											props.food.id
										)}
									</p>
									<span className="input-group-btn">
										<button
											type="button"
											className="btn btn-sm theme-btn btn-number"
											data-type="plus"
											data-field="quant[2]"
											// disabled={
											// 	!(
											// 		props.getCartItemQuantity(
											// 			props.food.id
											// 		) < props.food.quantity
											// 	)
											// }
											onClick={() =>
												props.increaseQuantity(
													props.food.id
												)
											}
										>
											<i
												className="fa fa-plus"
												aria-hidden="true"
											></i>
										</button>
									</span>
								</div>
							) : (
								<button
									// href="#"
									className="btn btn-small btn-success pull-right item-btn-control"
									// data-toggle="modal"
									// data-target="#order-modal"
									// disabled={props.food.quantity == 0}
									onClick={() => {
										props.addToCart(props.food);
									}}
									title="Add To Cart"
								>
									
									{/* <i className="fa fa-cart-arrow-down"></i> */}
									Add To Cart

								</button>
							)}
						</div>
					</div>
				</div>
			</div>
			{/* <!-- end:row --> */}
		</div>
	);
};

export default FoodItemCard;
