import React, { useEffect, useState } from "react";
import { getUserAddressById } from "../../redux/user/actions";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../AlertNotification/util";
import ModalView from "../Modal/ModalView";
import Moment from "moment";
import "./Addresses.css";
import Spinner from "../Spinner/Spinner";
import Pdf from "react-to-pdf";
import NewAddress from "./NewAddress/NewAddress";

const xApiKey = process.env.REACT_APP_X_API_KEY;
const baseUrl = process.env.REACT_APP_API_BASE_URL;
const Addresses = () => {
	const dispatch = useDispatch();
	const { addressList, addressLoading } = useSelector(
		(state) => state.userReducer
	);
	const authState = useSelector((state) => state.authReducer);
	const [loading, setLoading] = useState(false);
	const [selectedSpinner, setSelectedSpinner] = useState(null);
	// window.scrollTo(0,0);
	useEffect(() => {
		// get user ,address list
		dispatch(getUserAddressById(user.id));
	}, []);
	const { user } = authState;
	// delete customer address
	const onDeleteHandler = (addressId) => {
		setLoading(true);
		setSelectedSpinner(addressId);
		const config = {
			method: "DELETE",
			headers: {
				Accept: "*/*",
				"Access-Control-Allow-Origin": "*",
				"X-API-KEY": xApiKey,
			},
			body: JSON.stringify({
				customer_id: user.id,
				table: "customer_address",
				action: "Delete",
				id: addressId,
			}),
		};
		fetch(`${baseUrl}/api/Customer_address`, {
			...config,
		})
			.then((res) => res.json())
			.then((result) => {
				setLoading(false);
				if (result.status == false) {
					console.log("error", result);
					return notify("getting error !!" + result.msg, "warn");
				}
				dispatch(getUserAddressById(user.id));
				notify("Address Deleted !!", "success");
			})
			.catch((err) => {
				setLoading(false);
				console.log("err", err);
				notify("getting error !!" + err.messege, "warn");
			});
	};
	const style = {
		addressHeading: {
			backgroundColor: "#f3f3f3",
			padding: "9px 0px 9px 9px",
		},
	};
	// set default
	const onSetDefaultAddress = (addressId) => {
		setLoading(true);
		setSelectedSpinner(addressId);
		const config = {
			method: "DELETE",
			headers: {
				Accept: "*/*",
				"Access-Control-Allow-Origin": "*",
				"X-API-KEY": xApiKey,
			},
			body: JSON.stringify({
				customer_id: user.id,
				table: "customer_address",
				action: "Default",
				id: addressId,
			}),
		};
		fetch(`${baseUrl}/api/Customer_address`, {
			...config,
		})
			.then((res) => res.json())
			.then((result) => {
				setLoading(false);
				if (result.status == false) {
					console.log("error", result);
					return notify("getting error !!" + result.msg, "warn");
				}
				dispatch(getUserAddressById(user.id));
				notify("Success !!", "success");
			})
			.catch((err) => {
				setLoading(false);
				console.log("err", err);
				notify("getting error !!" + err.messege, "warn");
			});
	};

	// address list mapping
	const addresses =
		addressList &&
		addressList.map((addressObj, index) => (
			<div className="col-lg-6 col-md-12 col-sm-12 col-xl-4 d-flex justify-content-center">
				<div
					className="card box-shadow-sm p-1"
					style={{ width: "16rem", height: "20rem" }}
				>
					<div className="card-body">
						<div className="align-items-center d-flex justify-content-between mb-2">
							<span
								className={`badge ${
									addressObj.default == 1
										? "badge-primary text-white"
										: ""
								} `}
							>
								Default
							</span>
							{loading && addressObj.id == selectedSpinner && (
								<Spinner />
							)}
						</div>
						<ul>
							<li>Address: {addressObj.address}</li>
							<li>City: {addressObj.city_name}</li>
							<li>State: {addressObj.state_name}</li>
							<li>Country: {addressObj.country_name}</li>
							<li>Phone Number: 7742401557 </li>
						</ul>
						<div className="card-text btn-controls">
							<button
								className="btn btn-sm btn-link btn-focus-none text-danger text-decoration-none"
								onClick={() => onDeleteHandler(addressObj.id)}
								disabled={
									loading && addressObj.id == selectedSpinner
								}
							>
								Remove
							</button>
							|
							<button
								className="btn btn-sm btn-link text-danger btn btn-focus-none text-decoration-none"
								onClick={()=>onSetDefaultAddress(addressObj.id)}
							>
								Set Default
							</button>
						</div>
					</div>
				</div>
			</div>
		));
	// order items

	// const pdfRef = React.createRef();

	return (
		<div className="">
			<div
				className="d-flex px-1 justify-content-between"
				style={style.addressHeading}
			>
				<h3 className="">
					Manage Addresses {addressLoading ? <Spinner /> : null}
				</h3>
				<NewAddress />
			</div>
			<div className="mx-0 py-2 ">{addresses}</div>
		</div>
	);
};

export default Addresses;
