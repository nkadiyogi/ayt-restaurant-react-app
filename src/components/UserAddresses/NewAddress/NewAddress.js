import React, { useState, useRef } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { xApiKey } from "../../../envVariables";
import { useSelector, useDispatch } from "react-redux";
import { notify } from "../../AlertNotification/util";
import "./NewAddress.css";
import Spinner from "../../Spinner/Spinner";
import { getUserAddressById } from "../../../redux/user/actions";
import SimpleReactValidator from "simple-react-validator";
const styles = {
	fontFamily: "sans-serif",
	textAlign: "center",
};

const NewAddress = () => {
	const [open, setOpen] = useState(false);
	const userState = useSelector((state) => state.userReducer);
	const appState = useSelector((state) => state.appReducer);
	const { user, error } = userState;
	const [loading, setLoading] = useState(false);
	const [addressData, setAddressData] = useState({
		country: 1,
		state: 1,
		city: 1,
		address: "",
		pincode: "",
	});
	const dispatch = useDispatch();
	const inputValidator = useRef(new SimpleReactValidator());
	const onSubmitHandler = () => {
		if (inputValidator.current.allValid()) {
			setLoading(true);
			const config = {
				method: "POST",
				headers: {
					Accept: "*/*",
					"Access-Control-Allow-Origin": "*",
					"X-API-KEY": xApiKey,
				},
				body: JSON.stringify({ ...addressData, customer_id: user.id }),
			};
			fetch(
				`http://www.adiyogitechnosoft.com/restaurant/api/Customer_address`,
				{
					...config,
				}
			)
				.then((res) => res.json())
				.then((result) => {
					setLoading(false);
					if (result.status == false) {
						console.log("error", result);
						return notify("getting error !!" + result.msg, "warn");
					}
					console.log("result", result);
					setOpen(false);
					dispatch(getUserAddressById(user.id));
					notify("Address added !!", "success");
				})
				.catch((err) => {
					setLoading(false);
					console.log("err", err);
					notify("getting error !!" + JSON.stringify(err), "warn");
				});
		} else {
			inputValidator.current.showMessages();
			notify("Please fill required field", "warn");
		}
	};

	const onInputChange = (event) => {
		console.log("target", event.target);
		setAddressData({
			...addressData,
			[event.target.name]: event.target.value,
		});
	};
	const onOpenModal = () => {
		setOpen(true);
	};
	const onCloseModal = () => {
		setOpen(false);
	};
	// select options for city
	const cityOptions =
		appState &&
		appState.cityList &&
		appState.cityList
			.filter(
				(cityObj) =>
					cityObj.state_id == addressData.state &&
					cityObj.country_id == addressData.country
			)
			.map((city, index) => (
				<option key={index} value={city.id}>
					{city.name}
				</option>
			));
	const countryOptions =
		appState &&
		appState.countryList &&
		appState.countryList.map((country, index) => (
			<option key={index} value={country.id}>
				{country.name}
			</option>
		));
	const stateOptions =
		appState &&
		appState.stateList &&
		appState.stateList
			.filter((stateObj) => stateObj.country_id == addressData.country)
			.map((state, index) => (
				<option key={index} value={state.id}>
					{state.name}
				</option>
			));

	console.log("address data", addressData);
	return (
		<div style={styles}>
			<button
				onClick={onOpenModal}
				className="btn btn-focus-none btn-primary btn-sm"
			>
				<span className="fa fa-plus"></span> Add New
			</button>
			<Modal
				open={open}
				onClose={onCloseModal}
				center
				classNames={{
					overlay: "customOverlay",
					modal: "customModal",
				}}
			>
				<h2>Add New Address</h2>
				<div class="row">
					<div class="col-xs-12">
						<div class="form-group">
							<label>Full Address</label>
							<textarea
								type="text"
								class="form-control"
								placeholder="12,street no - 23, Pali ,rajasathan"
								value={addressData.address}
								onChange={onInputChange}
								name="address"
								onBlur={inputValidator.current.showMessageFor(
									"address"
								)}
							></textarea>
							{inputValidator.current.message(
								"name",
								addressData.address,
								"required|min:10|max:200",
								{ className: "text-danger sm" }
							)}
						</div>
						{/* <!--/form-group--> */}
					</div>
				</div>
				<div class="row">
					<div class="col-sm-6">
						<div class="form-group">
							<label>Country*</label>
							<select
								value={addressData.country}
								onChange={onInputChange}
								name="country"
								className="form-control"
								onBlur={inputValidator.current.showMessageFor(
									"country"
								)}
							>
								{inputValidator.current.message(
									"country",
									addressData.country,
									"required",
									{ className: "text-danger sm" }
								)}
								{countryOptions}
							</select>
						</div>
						{/* <!--/form-group--> */}
					</div>
					<div class="col-sm-6">
						<div class="form-group">
							<label>State*</label>
							<select
								type="text"
								value={addressData.state}
								onChange={onInputChange}
								name="state"
								className="form-control"
								onBlur={inputValidator.current.showMessageFor(
									"state"
								)}
							>
								{inputValidator.current.message(
									"state",
									addressData.state,
									"required",
									{ className: "text-danger sm" }
								)}
								{stateOptions}
							</select>
						</div>
						{/* <!--/form-group--> */}
					</div>
				</div>
				<div class="row">
					<div class="col-sm-6">
						<div class="form-group">
							<label>City*</label>
							<select
								type="text"
								value={addressData.city}
								onChange={onInputChange}
								name="city"
								className="form-control"
								onBlur={inputValidator.current.showMessageFor(
									"city"
								)}
							>
								{inputValidator.current.message(
									"name",
									addressData.city,
									"required",
									{ className: "text-danger sm" }
								)}
								{cityOptions}
							</select>
						</div>
						{/* <!--/form-group--> */}
					</div>
					<div class="col-sm-6">
						<div class="form-group">
							<label>Zip/ Postal Code*</label>
							<input
								type="text"
								class="form-control"
								placeholder="302012"
								value={addressData.pincode}
								onChange={onInputChange}
								name="pincode"
								onBlur={inputValidator.current.showMessageFor(
									"pincode"
								)}
							/>
							{inputValidator.current.message(
								"pincode",
								addressData.pincode,
								"required",
								{ className: "text-danger sm" }
							)}
						</div>
						{/* <!--/form-group--> */}
					</div>
				</div>
				<div className="row">
					<div class="col-sm-6 d-flex">
						<button
							className="btn btn-success"
							disabled={loading}
							onClick={onSubmitHandler}
						>
							Submit
						</button>
						{loading && <Spinner />}
					</div>
				</div>
			</Modal>
		</div>
	);
};
export default NewAddress;
