import React, { useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
// import logo from "../../images/food-picky-logo.png";
import NavLink from "../NavLink/NavLink";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../redux/app/action";
import { userLogout } from "../../redux/auth/authActions";
import { notify } from "../AlertNotification/util";
import defaultImg from "../../images/image-not-found1.png";
import "./RestaurantHeader.css";
import { clearUserData } from '../../redux/user/actions';

const RestaurantHeader = (props) => {
	const [toggleMenuButton, setToggleMenuButton] = useState(0);
	const appState = useSelector((state) => state.appReducer);
	const authState = useSelector((state) => state.authReducer);
	const cartState = useSelector((state) => state.cartReducer);
	const restaurantsState = useSelector((state) => state.restaurantsReducer);
	const restaurantState = useSelector((state) => state.restaurantReducer);
	const history = useHistory();
	const dispatch = useDispatch();
	let { path, url } = useRouteMatch();
	const { match } = props;
	const onLogout = () => {
		setToggleMenuButton(false);
		dispatch(userLogout());
		dispatch(setLogout());
		dispatch(clearUserData())
		notify("Logout success", "success");
		if (window && window.localStorage) {
			localStorage.removeItem("auth");
		}
		// history.push(`/${url}/order-online`)
	};
	const { restaurantProfile } = restaurantState;
	const { selectedCity } = restaurantsState;
	const { user } = authState;
	const { location } = history;
	// console.log("authState RestauranHeader.js", authState);
	// restaurant logo
	const brandLogo = `http://www.adiyogitechnosoft.com/restaurant/uploads/restaurant/${restaurantProfile.unique_id}/${restaurantProfile.logo}`;
	const userProfileImg = `http://www.adiyogitechnosoft.com/restaurant/${user.img}`;
	const setDefaultImg = (e) => (e.target.src = defaultImg);
	console.log("props match RestauranHeader.js", match);

	return (
		<nav className="navbar navbar-dark bg-inverse">
			<div className="container">
				<button
					className="navbar-toggler hidden-lg-up pull-left"
					type="button"
					onClick={() => setToggleMenuButton(!toggleMenuButton)}
				>
					☰
				</button>
				{/* <Link className="navbar-brand" to="/">
					<img
						className="img-rounded"
						src={logo}
						alt="food-picky-logo"
					/>
				</Link> */}
				<Link className="navbar-brand" to={url}>
					<img
						className="img-rounded"
						src={brandLogo}
						onError={setDefaultImg}
						alt="food-picky-logo"
						style={{ maxHeight: "35px" }}
						// width="100"
					/>
				</Link>
				<div
					className={`collapse ${
						toggleMenuButton ? "in pull-left" : ""
					} navbar-toggleable-md float-lg-right`}
				>
					<ul className="nav navbar-nav">
						<li className="nav-item">
							<Link
								className={`nav-link text-white ${
									location.pathname == url
										? "res-link-active"
										: ""
								} `}
								onClick={() => {
									setToggleMenuButton(false);
								}}
								to={url}
							>
								Home
							</Link>
						</li>
						{/* <li className="nav-item">
							<NavLink to="/restaurants/?searchTerm=">Restaurantds</NavLink>
						</li> */}

						<li className="nav-item">
							<Link
								className={`nav-link text-white ${
									location.pathname == url + "/order-online"
										? "res-link-active"
										: ""
								} `}
								to={`${url}/order-online`}
								onClick={() => {
									setToggleMenuButton(false);
								}}
							>
								Order Online
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to={`${url}/contact-us`}
								className={`nav-link text-white ${
									location.pathname == url + "/contact-us"
										? "res-link-active"
										: ""
								} `}
								onClick={() => {
									setToggleMenuButton(false);
								}}
							>
								Contact Us
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to={`${url}/about-us`}
								className={`nav-link text-white ${
									location.pathname == url + "/about-us"
										? "res-link-active"
										: ""
								} `}
								onClick={() => {
									setToggleMenuButton(false);
								}}
							>
								About Us
							</Link>
						</li>
						{/* <li className="nav-item">
							<Link
								className={`nav-link text-white ${
									location.pathname == url + "/checkout"
										? "res-link-active"
										: ""
								} `}
								onClick={() => {
									setToggleMenuButton(false);
								}}
								to={`${url}/checkout`}
							>
								Cart{" "}
							</Link>
						</li> */}
						{appState.loggedIn && (
							<li className="nav-item">
								<div
									className={`dropdown user-acc-link ${
										location.pathname.includes(
											"/user-account"
										)
											? "res-link-active"
											: ""
									} `}
								>
									<a class="">
										<img
											className="profile-logo img-thumbnail"
											onError={setDefaultImg}
											src={userProfileImg}
											alt="img"
										/>
										<span className="ml-1 text-white">
											{" "}
											{authState.user.firstname}
										</span>
									</a>
									<div
										class="dropdown-content pb-1"
										style={{ orderRadius: "5px" }}
									>
										<Link
											to={`${url}/user-account/profile`}
											className={`dropdown ${
												location.pathname ==
												url + "/user-account/profile"
													? "text-danger"
													: ""
											} `}
											onClick={() => {
												setToggleMenuButton(false);
											}}
										>
											Profile
										</Link>
										<Link
											to={`${url}/user-account/orders`}
											className={`dropdown ${
												location.pathname ==
												url + "/user-account/orders"
													? "text-danger"
													: ""
											} `}
											onClick={() => {
												setToggleMenuButton(false);
											}}
										>
											Orders
										</Link>
										<Link
											to={`${url}/user-account/address`}
											className={`dropdown ${
												location.pathname ==
												url + "/user-account/address"
													? "text-danger"
													: ""
											} `}
											onClick={() => {
												setToggleMenuButton(false);
											}}
										>
											Address
										</Link>
										<li className="nav-item">
											<button
												className="dropdown"
												onClick={() => {
													onLogout();
												}}
											>
												Sign out
											</button>
										</li>
									</div>
								</div>
							</li>
						)}

						{!appState.loggedIn && (
							<li className="nav-item">
								<Link
									to={`${url}/log-in`}
									className={`nav-link text-white ${
										location.pathname == url + "/log-in"
											? "res-link-active"
											: ""
									} `}
									onClick={()=> {setToggleMenuButton(false)}}
								>
									Log in
								</Link>
							</li>
						)}
						{!appState.loggedIn && (
							<li className="nav-item">
								<Link
									to={`${url}/signup`}
									className={`nav-link text-white ${
										location.pathname == url + "/signup"
											? "res-link-active"
											: ""
									} `}
									onClick={()=> {setToggleMenuButton(false)}}
								>
									Signup
								</Link>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};
export default RestaurantHeader;
