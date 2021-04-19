import React, { useEffect, useState } from "react";
import { updateSecondryLink } from "../../redux/Restaurants/action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Login from "../../components/Login/Login";
import Signup from "../../components/SignUp/Signup";
import { setLogin } from "../../redux/app/action";
import "./Checkout.css";
import { addToCart, clearCart, checkout } from "../../redux/Cart/action";
import Notification from "../../components/AlertNotification/Notification";
import { notify } from "../../components/AlertNotification/util";
import { xApiKey } from "../../envVariables";
import bgImg from "../../images/Carasual_img/slider2.jpg";
import NewAddress from "../../components/UserAddresses/NewAddress/NewAddress";
import CartItems from "../../components/cartItems/CartItems";
import * as cartActionTypes from "../../redux/Cart/actionTypes";
const baseURL = process.env.REACT_APP_API_BASE_URL;
const Checkout = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(checkout());
		setAddress();
	}, []);
	const [paymentStatus, setPaymentStatus] = useState(false);
	const [paymentError, setPaymentError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [shippingAddress, setShippingAddress] = useState({});
	const dispatch = useDispatch();
	const cartState = useSelector((state) => state.cartReducer);
	const appState = useSelector((state) => state.appReducer);
	const authState = useSelector((state) => state.authReducer);
	const { addressList, addressLoading } = useSelector(
		(state) => state.userReducer
	);
	// states for signup form and login form
	// user clicks on button set state to true
	const [loginBtn, setLoginBtn] = useState(false);
	const [signUpBtn, setSignUpBtn] = useState(false);
	const { user } = authState;
	const {
		restaurantId,
		checkoutProducts,
		paymentMode,
		grandTotal,
		itemsTotalAmt,
		taxAmount,
		shippingAmt,
		orderMode,
	} = cartState;
	const onCloseAlert = () => {
		setShowAlert(false);
	};

	const onPlaceOrder = () => {
		setLoading(true);

		const bodyData = {
			restaurant_id: restaurantId,
			shipping_charge: shippingAmt,
			total_amount: itemsTotalAmt,
			discount: 0,
			discount_per: 0,
			coupon_code_applied: "0",
			coupon_id: "0",
			tax_id: "0",
			total_tax: taxAmount,
			net_amt: grandTotal,
			user_id: user.id,
			payment_id: "",
			payment_status: 0,
			order_mode: orderMode,
			payment_mode: paymentMode,
			product_details: checkoutProducts.order,
			shipping_address: shippingAddress.id,
			subtotal: itemsTotalAmt,
		};
		// place order API call
		console.log("order body", bodyData);
		const config = {
			method: "POST",
			headers: {
				Accept: "*/*",
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json",
				"X-API-KEY": xApiKey,
			},
			body: JSON.stringify(bodyData),
		};
		fetch(`${baseURL}/api/order`, {
			...config,
		})
			.then((res) => res.json())
			.then((result) => {
				setLoading(false);
				if (result.status == false) {
					console.log("error", result);
					return notify("getting error " + result.msg, "warn");
				}
				console.log("result", result);
				notify("order placed !!", "success");
				dispatch(clearCart());
			})
			.catch((err) => {
				console.log("err", err);
				notify("failed to place order !!" + err.messege, "warn");
				setLoading(false);
			});
	};
	// console.log('addressList.sort ',addressList.sort( (a, b) => a.id - b.id));
	const addresses =
		addressList &&
		addressList
			.sort((a, b) => b.id - a.id)
			.map((addressObj, index) => (
				<div className="col-sm-12">
					<div
						className="card box-shadow-sm p-1"
						style={{ width: "16rem", height: "10rem" }}
					>
						<div className="card-body">
							<ul>
								<li>Address: {addressObj.address}</li>
								<li>City: {addressObj.city_name}</li>
							</ul>
							<div className="card-text btn-controls">
								<button
									className={`btn btn-focus-none btn-sm ${addressObj.id == shippingAddress.id
										? "btn-primary"
										: ""
										}`}
									onClick={() => setAddress(addressObj.id)}
								>
									select
								</button>
							</div>
						</div>
					</div>
				</div>
			));
	const style = {
		accountHeading: {
			//
		},
		textLeft: {
			textAlign: "left",
		},
		
	};
	// console.log('baseURL addresses.js ',baseURL);
	const setAddress = (addressId) => {
		let addressObj = null;
		if (addressId) {
			addressObj = addressList.find(
				(addressObj) => addressObj.id == addressId
			);

		} else {
			addressObj = addressList.find(
				(addressObj) => addressObj.default == 1
			);

		}
		if (!addressObj) {
			addressObj = {
				id: "",
				customer_id: "",
				country: "",
				state: "",
				city: "",
				address: "",
				default: "",
				pin_code: "",
				city_name: "",
				state_name: "",
				country_name: "",
			};
		}
		setShippingAddress(addressObj);
	};
	const tableBookingTime = ['08:00 pm','09:00 pm','10:00 pm','11:00 am','12:00 pm', '01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm', '05:00 pm','06:00 pm','07:00 pm','08:00 pm','09:00 pm','10:00 pm',].map((time, index) => <span key={index} className="d-flex table-time"> {time}</span>)
	return (
		<div className="checkout-bg pb-3">
			<section
				className="bg-image space-md"
				// data-image-src="https://picsum.photos/1670/680/?random"
				data-image-src={bgImg}
				style={{
					background:
						// 'url("https://picsum.photos/1670/680/?random") center center / cover no-repeat',
						`url(${bgImg}) center center / cover no-repeat`,
				}}
			>
				<div className="profile">
					<div className="container">
						<div className="row">
							<div className="col-xs-12 col-sm-4  col-lg-4 profile-img">
								<div className="">
									<h1 className="h1 font-weight-bold text-white">
										Checkout
									</h1>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className="container m-t-30">
				<div className="">
					{/* /widget heading */}
					<div className="widget-heading border-none bg-white">
						<h1 className=" text-dark account-head-text font-weight-bold h1">
							Checkout
						</h1>
						<div class="clearfix"></div>
					</div>
					<div className=" mx-0 row pt-1">
						<div className="col-lg-8 col-md-6 col-sm-6 margin-b-30 pl-0 pb-1">
							<div className="px-3 py-2 bg-white">
								<div className="account-heading">
									<h2 className="font-weight-bold h2 text-muted">
										Account
									</h2>
								</div>
								{appState && !appState.loggedIn && (
									<div>
										<div className=" mb-3 mt-3">
											<div>
												<p>
													To place your order now, log
													in to your existing account
													or sign up.
												</p>
											</div>
											{loginBtn && <Login />}

											{signUpBtn && (
												<div className="mt-3">

													<Signup />
												</div>
											)}
											<div className="mt-3 mb-3 d-flex">
												{!loginBtn && (
													<div className="mb-3 mr-2">
														<button
															className="checkout-login-btn check-btn-content font-weight-bold"
															onClick={() => {
																setLoginBtn(
																	true
																);
																setSignUpBtn(
																	false
																);
															}}
														>
															<span className="font-weight-normal">
																{" "}
																Have an account
																?
															</span>
															LOG IN
														</button>
													</div>
												)}
												{!signUpBtn && (
													<div className="mb-3">
														<button
															className="checkout-sign-btn check-btn-content font-weight-bold "
															onClick={() => {
																setSignUpBtn(
																	true
																);
																setLoginBtn(
																	false
																);
															}}
														>
															<span className="font-weight-normal">
																New to Site ?
															</span>
															SIGN UP
														</button>
													</div>
												)}
											</div>
										</div>
									</div>
								)}
								{appState && appState.loggedIn && (
									<div className="">
										<table className="">
											<tbody>
												<tr>
													<td scope="row">Name:</td>
													<td>
														{user.firstname}
														{user.lastname}
													</td>
												</tr>
												<tr>
													<td scope="row">Phone:</td>
													<td>{user.mobile}</td>
												</tr>
												<tr>
													<td scope="row">
														Address:
													</td>
													<td className="w-100">
														{
															shippingAddress.address
														}
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								)}
								{orderMode ==
									cartActionTypes.ORDER_MODE_ID_DELIVERY && (
										<div className="mt-3">
											<div className="d-flex justify-content-between mb-1">
												<h2 className="font-weight-bold h2 text-muted">
													Select Delivery Address
											</h2>
												{appState && appState.loggedIn && (
													<NewAddress />
												)}
											</div>
											{appState && appState.loggedIn && (
												<div className="">
													<div className="d-flex custom-scroll addresses-bar">
														{addresses}
													</div>
												</div>
											)}
										</div>
									)}
								{orderMode ==
									cartActionTypes.ORDER_MODE_ID_BOOK_TABLE && (
										<div className="mt-3">
											<h2 className="font-weight-bold h2 text-muted">
												Please select your booking details
										</h2>
											{appState && appState.loggedIn && (
												<div
													className="form-horizontal contact-form mt-1"
													role="form"
												>
													<fieldset>
														<div className="row form-group">
															<div className="col-xs-12 col-lg-6">
																<select
																	className="form-control"
																	name="bookingDate"
																	type="text"
																	required
																>
																	<option value="0">Select Date</option>
																	<option value="0">Sun,8 April</option>
																	<option value="0">Sun,8 April</option>
																	<option value="0">Sun,8 April</option>
																</select>

															</div>
															<div className="col-xs-12 col-lg-6">
																<select
																	className="form-control"
																	id="fname"
																	name="fname"
																	type="text"
																	required
																>
																	<option value="0">Select Guests	</option>
																	<option value="1">1</option>
																	<option value="2">2</option>
																	<option value="3">3</option>
																	<option value="4">4</option>
																	<option value="5">5</option>
																</select>
															</div>
															<div className="col-xs-12  mt-1">
																<h5 className="font-weight-bold h5 m-0 pl-0 py-1 text-muted"> Select Time</h5>
															<div className="table-time-col">
																{tableBookingTime}
															</div>
															</div>
														</div>

														<div className="row form-group">
															<div className="col-xs-12">
																<textarea
																	className="form-control"
																	id="message"
																	name="message"
																	rows={5}
																	placeholder="Additional requests"
																	required
																	defaultValue={
																		""
																	}
																/>
															</div>
														</div>
													</fieldset>
												</div>
											)}
										</div>
									)}

								{!orderMode && (
									<div className="mt-3">
										<h2 className="font-weight-bold h2 text-muted">
											Please Select Order Mode Online delivery/Takeaway
										</h2>
									</div>
								)}
							</div>
						</div>
						<div className="bg-white py-2 px-2 col-lg-4 col-sm-6 ">
							<div className="cart-totals margin-b-20 ">
								<div className="">
									<CartItems />
								</div>
								<div className="cart-totals-fields">
									<table className="table">
										<tbody>
											<tr>
												<td style={style.textLeft}>
													Cart Subtotal
												</td>
												<td>
													<span className="rupee-symbol">
														&#8377;
													</span>
													{cartState.itemsTotalAmt}
												</td>
											</tr>
											<tr>
												<td style={style.textLeft}>
													Shipping &amp; Handling
												</td>
												<td>
													<span className="rupee-symbol">
														&#8377;
													</span>
													{cartState.shippingAmt}
												</td>
											</tr>
											<tr className="bg-faded">
												<td
													className="text-color"
													style={style.textLeft}
												>
													<strong>Total</strong>
												</td>
												<td className="text-color">
													<strong>
														<span className="rupee-symbol">
															&#8377;
														</span>
														{cartState.grandTotal}
													</strong>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							{/*cart summary*/}
							{appState && appState.loggedIn && !paymentStatus && (
								<div className="payment-option">
									<ul className=" list-unstyled">
										<li>
											<label className="custom-control custom-radio  m-b-20">
												<input
													id="radioStacked1"
													name="radio-stacked"
													type="radio"
													checked
													className="custom-control-input"
												/>
												<span className="custom-control-indicator" />
												<span className="custom-control-description">
													Payment on Delivery
												</span>
											</label>
										</li>
									</ul>
									<div className=" text-xs-center">
										
										<button
											onClick={onPlaceOrder}
											className="btn theme-btn d-flex pull-right"
											disabled={loading}
										>
										{orderMode == cartActionTypes.ORDER_MODE_ID_BOOK_TABLE ? <>Book Your Table</>:	<>Place Order</>}
											{loading && (
												<div className="ml-1 loader"></div>
											)}
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
