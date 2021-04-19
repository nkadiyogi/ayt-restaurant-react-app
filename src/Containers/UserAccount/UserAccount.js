import React,{ useEffect } from 'react';
import "./UserAccount.css";
import UserProfile from "../../components/UserProfile/UserProfile";
import { Route, Switch, Link } from "react-router-dom";
import Orders from "../../components/Orders/Orders";
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUserById } from '../../redux/user/actions';
import Addresses from '../../components/UserAddresses/Addresses';

const UserAccount = (props) => {
	const dispatch = useDispatch()
	const location = useLocation();
	const authState = useSelector(state=> state.authReducer);
	const {user} = authState;
	// useEffect(() => {
	// 	dispatch(getUserById(user.id))
	// }, [])

	const style = {
		ordersHeading: {
			backgroundColor: "#f3f3f3",
		},
		tableFooter: {
			borderBottom: "1px solid #e0e0e0",
		},
	};
	const links = [
		{ to: `${props.match.path}/profile`, label: "Profile" },
		{ to: `${props.match.path}/orders`, label: "Orders" },
		{ to: `${props.match.path}/address`, label: "Address" },
	];
	const navLinks = links.map((link, index) => (
		<li
			className={`list-group-item ${
				link.to == location.pathname ? "li-active" : ""
			}`}
		>
			<Link to={link.to} className="w-100 text-decoration-none">
				{link.label}
			</Link>
		</li>
	));
	// console.log('props [userAccount.js]',props)
	console.log("location [userAccount.js]", location);
	
	return (
		<div className="account-container">
			<div className="acount-heading">
				<div>
					<h1 className="text-white">{authState.user.firstname} {authState.user.lastname}</h1>
					<h6 className="text-white">{authState.user.mobile}, {authState.user.email}</h6>
				</div>
			</div>
			<div className="account-sub-container">
				<div className="row ">
					<div className="col-xs-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 mb-1 left-nav">
						<ul className="list-group left-nav-ul pl-2 pb-2 pt-2">
							{navLinks}
						</ul>
					</div>
					<div className="col-xs-12 col-sm-12 col-md-8 col-lg-9 col-xl-9 mb-2">
						<Switch>
							<Route
								path={`${props.match.path}/profile`}
								exact
								component={UserProfile}
							/>
							<Route
								path={`${props.match.path}/orders`}
								exact
								component={Orders}
							/>
							<Route
								path={`${props.match.path}/address`}
								exact
								component={Addresses}
							/>
						</Switch>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserAccount;
