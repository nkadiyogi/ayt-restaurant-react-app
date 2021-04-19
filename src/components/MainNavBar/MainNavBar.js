import React, { useState } from "react";
import { Link,useHistory ,Redirect,useRouteMatch} from "react-router-dom";
import logo from "../../images/food-picky-logo.png";
import NavLink from "../NavLink/NavLink";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../redux/app/action";
import { userLogout } from "../../redux/auth/authActions";
import { notify } from "../AlertNotification/util";
import defaultImg from "../../images/image-not-found1.png";
import { addToCart } from '../../redux/Cart/action';
// import
const MainNavBar = () => {
	const [toggleMenuButton, setToggleMenuButton] = useState(0);
	const appState = useSelector((state) => state.appReducer);
	const authState = useSelector((state) => state.authReducer);
	const cartState = useSelector((state) => state.cartReducer);
	const restaurantsState = useSelector((state) => state.restaurantsReducer);
	const restaurantState = useSelector((state) => state.restaurantReducer);
	const history = useHistory()
	const dispatch = useDispatch();
	const {url,path} = useRouteMatch();
	const onLogout = () => {
		dispatch(userLogout());
		dispatch(setLogout());
		notify("Logout success", "success");
		if (window && window.localStorage) {
			localStorage.removeItem("auth");
		}
	};

	const {restaurantProfile} = restaurantState;
	const { selectedCity } = restaurantsState;
	// restaurant logo
	const brandLogo =   `http://www.adiyogitechnosoft.com/restaurant/uploads/restaurant/${restaurantProfile.unique_id}/${restaurantProfile.logo}`;
	const setDefaultImg = (e)=> e.target.src = defaultImg
	console.log('useRouteMatch [MainNavBar.js]',url,path)
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
				<Link className="navbar-brand" to="/">
					<img
						className="img-rounded"
						src={brandLogo}
						onError={setDefaultImg}
						alt="food-picky-logo"
						// style={{maxHeight:'35'}}
						width="100px"
					/>
				</Link> 
				<div
					className={`collapse ${
						toggleMenuButton ? "in pull-left" : ""
					} navbar-toggleable-md float-lg-right`}
				>
					<ul className="nav navbar-nav">
						<li className="nav-item">
							{/* <NavLink to="/" >Home </NavLink> */}
							{/* <button className="btn btn-link nav-link text-white" onClick={()=>{
								// history.push(`restaurant/${restaurantProfile.url}`)
								<Redirect to={`restaurant/${restaurantProfile.url}`}/>
							}}>Home</button> */}
							<NavLink to="/" >Home </NavLink>
						</li>
						{/* <li className="nav-item">
							<NavLink to="/restaurants/?searchTerm=">Restaurantds</NavLink>
						</li> */}
						<li className="nav-item">
							<NavLink to="/about" >About </NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/contact" >Contact </NavLink>
						</li>
						{/* <li className="nav-item">
							<NavLink to="/cart" >Cart </NavLink>
						</li> */}

						{/* {appState.loggedIn && (
							<li className="nav-item">
								<div class="dropdown">
									<button class="dropbtn btn dropbtn">
										{authState.user.firstname}
									</button>
									<div class="dropdown-content">
										<Link
											to="/user-account/profile"
											className="dropdown"
										>
											Profile
										</Link>
										<Link
											to="/user-account/orders"
											className="dropdown"
										>
											Orders
										</Link>
									</div>
								</div>
							</li>
						)} */}

						{/* {!appState.loggedIn && (
							<li className="nav-item">
								<NavLink to="/log-in" className="text-white">Log in </NavLink>
							</li>
						)}
						{!appState.loggedIn && (
							<li className="nav-item">
								<NavLink to="/signup" className="text-white">Signup</NavLink>
							</li>
						)} */}
						{/* {appState.loggedIn && (
							<li className="nav-item">
								<button
									className="btn btn-danger"
									onClick={onLogout}
								>
									Sign out
								</button>
							</li>
						)} */}
						{/* <li className="nav-item">
							<div className="nav-link">
								<i class="fas fa-map-marker-alt"></i>	
								<a
									href="javascript:void(0)"
									className="px-1 text-white"
									style={{ border: "" }}
								>
									{selectedCity.name}
								</a>
							</div>
						</li> */}
					</ul>
				</div>
			</div>
		</nav>
	);
};
export default MainNavBar;
