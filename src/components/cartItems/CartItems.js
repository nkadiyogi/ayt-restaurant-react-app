import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./CartItems.css";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import Tooltip from "../ToolTip/Tooltip";
import {
	checkout,
	decreaseItemQuantity,
	increaseItemQuantity,
	removeItem,
	clearCart,
	setOrderMode,
} from "../../redux/Cart/action";
import * as cartActionTypes from "../../redux/Cart/actionTypes";
const CartItems = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const cartState = useSelector((state) => state.cartReducer);
	const restaurantState = useSelector((state) => state.restaurantReducer);
	const { restaurantProfile } = restaurantState;
	const cartItemsState = cartState.cartItems;
	const { orderMode, table } = cartState;
	const {} = props;
	const style = {
		widgetBody: {
			padding: "5px 13px",
		},
		cartItemQuan: {
			paddingTop: "3px",
		},
		heading: { fontSize: "25px", color: "#818a91" },
		buttonRow: {
			display: "flex",
			justifyContent: "space-between",
			marginBottom: "9px",
			alignItems: "center",
		},
		buttonMinus: {
			padding: "1px 7px",
		},
		buttonPlus: {
			padding: "1px 6px",
		},
	};
	const cartItems =
		cartItemsState && cartItemsState.length > 0 ? (
			cartItemsState.map((itemData, index) => (
				<div className="order-row bg-white">
					<div style={style.widgetBody}>
						<div style={style.buttonRow}>
							<p className="mb-0 pull-left">
								{itemData.item.name}
							</p>
							<i
								role="button"
								className="fa fa-trash pull-right text-danger"
								onClick={() =>
									dispatch(removeItem(itemData.item.id))
								}
							/>
						</div>
						<div className="form-group row no-gutter">
							<div className="align-items-center col-xs-9 d-flex justify-content-between">
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<button
										className="btn btn-sm btn-outline-secondary py-0"
										disabled={itemData.quantity < 1}
										onClick={() =>
											dispatch(
												decreaseItemQuantity(
													itemData.item.id
												)
											)
										}
										style={style.buttonMinus}
									>
										-
									</button>
									<p className="px-1 mb-0 text-center btn-quantity">
										{itemData.quantity}
									</p>
									<button
										className="btn btn-sm btn-outline-secondary py-0"
										style={style.buttonPlus}
										// disabled={
										// 	!(
										// 		itemData.quantity <
										// 		itemData.item.quantity
										// 	)
										// }
										onClick={() =>
											dispatch(
												increaseItemQuantity(
													itemData.item.id
												)
											)
										}
									>
										+
									</button>
								</div>
								<div className="mr-1">
									<span>
										{itemData.quantity} x
										<span className="rupee-symbol">
											&#8377;
										</span>
										{itemData.item.price}
									</span>
								</div>
							</div>
							<div
								className="col-xs-3"
								style={style.cartItemQuan}
							>
								<p className="mb-0 pull-right">
									<span className="rupee-symbol">
										&#8377;
									</span>
									{Number(itemData.quantity) *
										parseFloat(itemData.item.price)}
								</p>
							</div>
						</div>
					</div>
				</div>
			))
		) : (
			<div>
				<p className="mt-3 text-center">No items in cart</p>
			</div>
		);
	const { url, path } = useRouteMatch();
	console.log("useRouteMatch[CartItems.js]", url, path);
	return (
		<div className="sidebar-wrap">
			<div
				className={`${
					url.includes("/order-online") ? "widget " : ""
				} widget-cart`}
			>
				<div className="widget-heading d-flex">
					<h3
						className="widget-title text-dark"
						style={
							url.includes("/order-online") ? null : style.heading
						}
					>
						Your Food Cart
					</h3>
					{cartItems.length > 0 && (
						<button
							className="btn btn-sm btn-secondary pull-right"
							onClick={() => dispatch(clearCart())}
						>
							Clear Cart
						</button>
					)}

					<div className="clearfix" />
				</div>
				<div className="custom-scroll cart-scroll">{cartItems}</div>
				{/* end:Order row */}
				<div className="widget-delivery clearfix">
					{orderMode == cartActionTypes.ORDER_MODE_ID_BOOK_TABLE ? (
						<div className="m-1">
							<h5 className="font-weight-bold h3 mb-0 p-1 text-white tableNo">
								Table No: <span>{table.tableData.tableNo}</span>
							</h5>
						</div>
					) : (
						<div>
							<div className="col-xs-6 col-sm-12 col-md-6 col-lg-6 b-t-0">
								<label className="custom-control custom-radio ">
									<input
										id="radio4"
										name="delevery"
										type="radio"
										value="1"
										disabled={
											restaurantProfile.online_booking ==
											0
										}
										className="custom-control-input"
										checked={orderMode == 1}
										onChange={() =>
											dispatch(
												setOrderMode(
													cartActionTypes.ORDER_MODE_ID_DELIVERY
												)
											)
										}
									/>
									<span className="custom-control-indicator" />
									<span className="custom-control-description">
										Delivery
									</span>
								</label>
							</div>
							<div className="col-xs-6 col-sm-12 col-md-6 col-lg-6 b-t-0">
								<label className="custom-control custom-radio">
									<input
										id="radio3"
										name="takeOut"
										type="radio"
										disabled={
											restaurantProfile.take_away == 0
										}
										className="custom-control-input"
										checked={orderMode == 2}
										onChange={() =>
											dispatch(setOrderMode(2))
										}
									/>
									<span className="custom-control-indicator" />
									<span className="custom-control-description">
										Take away
									</span>
								</label>
							</div>
						</div>
					)}
				</div>

				{url.includes("/order-online") && (
					<div className="widget-body">
						<div className="price-wrap text-xs-center">
							<p>TOTAL</p>
							<h3 className="value">
								<strong>
									<span className="rupee-symbol">
										&#8377;
									</span>
									{cartState.itemsTotalAmt}
								</strong>
							</h3>
							<Link
								className="btn theme-btn btn-lg"
								to={`/restaurant/${restaurantProfile.url}/checkout`}
							>
								Checkout
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CartItems;
