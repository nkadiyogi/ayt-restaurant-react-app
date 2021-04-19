import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { notify } from "../AlertNotification/util";
import { xApiKey } from "../../envVariables";
import Spinner from "../Spinner/Spinner";
import defaultImg from "../../images/image-not-found1.png";
import "./UserProfile.css";
import Notification from '../AlertNotification/Notification';
import {getUserById }from '../../redux/user/actions'
const UserProfile = () => {
	const userState = useSelector((state) => state.userReducer);
	const appState = useSelector((state) => state.appReducer);
	const { user,error } = userState;
	const [userData, setUserData] = useState({
		firstname: "",
		lastname: "",
		email: "",
		mobile: "",
		address: "",
		country: '',
		countryId: 1,
		state: '',
		stateId: 1,
		city: '',
		cityId: 1,
		gender: 0,
		addressId: "",
		pincode: 306401,
	});
	const [edit, setEdit] = useState(false);
	const [profileImg, SetProfileImg] = useState({ preview: "", raw: "" });
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setUserData(user);
	}, []);
	const dispatch = useDispatch();
	console.log("REACT_APP_X_API_KEY", xApiKey);
	const userProfileImg = `http://www.adiyogitechnosoft.com/restaurant/${user.img}`;
	const onSubmitUpdateHandler = () => {
		setLoading(true);
		const formData = new FormData();
		formData.append("image", profileImg.raw);
		formData.append("id", user.id);
		formData.append("firstname", userData.firstname);
		formData.append("lastname", userData.lastname);
		formData.append("email", userData.email);
		formData.append("mobile", userData.mobile);
		formData.append("gender", 1);
		formData.append("address_id", userData.addressId);
		formData.append("country", userData.countryId);
		formData.append("state", userData.stateId);
		formData.append("city", userData.cityId);
		formData.append("pincode", userData.pincode);
		formData.append("address", userData.address);

		// firstname:Kmalas
		// lastname:kishoooooor
		// gender:1
		// mobile:8387867538
		// email:alskdfk@gmail.com
		// id:2
		// address_id:3
		// country:1
		// state:1
		// city:6
		// address:Kumaro ka bass bastttttti wala
		// pincode:35520

		const config = {
			method: "POST",
			headers: {
				Accept: "*/*",
				
				"Access-Control-Allow-Origin": "*",
				"X-API-KEY": xApiKey,
			},
			body: formData,
		};
		fetch(
			`http://www.adiyogitechnosoft.com/restaurant/api/users/user_update`,
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
				dispatch(getUserById(user.id))
				setEdit(false);
				notify("profile updated !!", "success");
			})
			.catch((err) => {
				setLoading(false);
				console.log("err", err);
				notify("getting error !!" + JSON.stringify(err), "warn");
			});
	};
	const handleImgInput = (e) => {
		if (e.target.files.length) {
			SetProfileImg({
				preview: URL.createObjectURL(e.target.files[0]),
				raw: e.target.files[0],
			});
		}
	};
	const onInputChange = (event) => {
		console.log("target", event.target);
		setUserData({
			...userData,
			[event.target.name]: event.target.value,
		});
	};

	// select options for city
	const cityOptions =
		appState && appState.cityList &&
		appState.cityList.filter(cityObj=> cityObj.state_id == userData.stateId && cityObj.country_id == userData.countryId).map((city, index) => (
			<option key={index} value={city.id}>
				{city.name}
			</option>
		));
	const countryOptions =
		appState && appState.countryList &&
		appState.countryList.map((country, index) => (
			<option key={index} value={country.id}>
				{country.name}
			</option>
		));
	const stateOptions =
		appState && appState.stateList &&
		appState.stateList.filter(stateObj=> stateObj.country_id == userData.countryId).map((state, index) => (
			<option key={index} value={state.id}>
				{state.name}
			</option>
		));
	const style = {
		editButton: {
			backgroundColor: "#f34423",
		},
		input: {
			border: 0,
		},
		onInputEdit: {
			// border: "0px",
			// padding: "5px 10px",
			// borderRadius: "7px",
			// textAlgin:'center',
			// backgroundColor:'white'
		},
	};
	console.log("user data profile.js", userData);
	const setDefaultImg = (e) => (e.target.src = defaultImg);
	return (
		<div className="user-container">
			{error?<Notification type='danger' messege={'Someting going wrong !!'+ error}/>:null}
			<div className="row">
				<div class="col-sm-12 margin-b-30">
					<div className="row d-flex justify-content-center mb-3">
						<div className="">
							<img
								src={
									edit && profileImg.preview
										? profileImg.preview
										: userProfileImg
								}
								onError={setDefaultImg}
								alt="profile pic"
								className="img-thumbnail u-profile-img"
								id="pro1"
							/>
							<div className="mt-1 text-center">
								<label
									htmlFor="pro1"
									className="font-weight-bold"
								>
									Profile Image
								</label>
							</div>
							{edit && (
								<div className="mt-2 text-center">
									<label
										className="mb-2 px-0"
										htmlFor="profileInput"
										role="button"
									>
										<i className="fa fa-2x fa-upload"></i>{" "}
										Change Profile
									</label>
									<input
										type="file"
										id="profileInput"
										className="w-100 file-input"
										onChange={handleImgInput}
									/>
								</div>
							)}
						</div>
					</div>

					<div class="row">
						<div class="col-sm-6">
							<div class="form-group">
								<label>First Name*</label>
								<input
									type="text"
									class="form-control"
									placeholder="John"
									disabled={!edit}
									value={userData.firstname}
									onChange={onInputChange}
									name="firstname"
								/>{" "}
							</div>
							{/* <!--/form-group--> */}
						</div>
						<div class="col-sm-6">
							<div class="form-group">
								<label>Last Name*</label>
								<input
									type="text"
									class="form-control"
									placeholder="Doe"
									disabled={!edit}
									value={userData.lastname}
									onChange={onInputChange}
									name="lastname"
								/>{" "}
							</div>
							{/* <!--/form-group--> */}
						</div>
					</div>
					<div class="row">
						<div class="col-sm-6">
							<div class="form-group">
								<label>Country*</label>
						<select
									value={userData.countryId}
									onChange={onInputChange}
									name="country"
									className="form-control"
									disabled={!edit}
								>
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
									value={userData.stateId}
									onChange={onInputChange}
									name="state"
									className="form-control"
									disabled={!edit}
								>
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
									value={userData.cityId}
									onChange={onInputChange}
									name="city"
									className="form-control"
									disabled={!edit}
								>
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
									disabled={!edit}
									value={userData.pincode}
									onChange={onInputChange}
									name="pincode"
								/>{" "}
							</div>
							{/* <!--/form-group--> */}
						</div>
					</div>
					<div class="row">
						<div class="col-sm-12">
							<div class="form-group">
								<label>Full Address*</label>
								<textarea
									type="text"
									class="form-control"
									placeholder="124, Lorem Street.."
									disabled={!edit}
									value={userData.address}
									onChange={onInputChange}
									name="address"
								></textarea>
							</div>
							{/* <!--/form-group--> */}
						</div>
					</div>
					<div class="row">
						<div class="col-sm-6">
							<div class="form-group">
								<label>phone*</label>
								<input
									type="text"
									class="form-control"
									placeholder="123-345-3322"
									disabled={!edit}
									value={userData.mobile}
									onChange={onInputChange}
									name="mobile"
								/>
							</div>
							{/* <!--/form-group--> */}
						</div>
						<div class="col-sm-6">
							<div class="form-group">
								<label>Email Address*</label>
								<input
									type="text"
									class="form-control"
									placeholder="john@doe.com"
									disabled={!edit}
									value={userData.email}
									onChange={onInputChange}
									name="email"
								/>
							</div>
						</div>{" "}
					</div>
				</div>
			</div>

			<div className="mr-1">
				<button
					className="btn btn-primary"
					onClick={() => setEdit(true)}
					disabled={edit}
				>
					Edit
				</button>
				{edit && (
					<button
						className="btn btn-info btn-outline-primary ml-2"
						onClick={onSubmitUpdateHandler}
						disabled={loading}
					>
						Update {loading && <Spinner />}
					</button>
				)}
				{edit && (
					<button
						className="btn btn-info ml-2 btn-outline-danger"
						onClick={() => setEdit(false)}
					>
						Cancel
					</button>
				)}
			</div>
		</div>
	);
};

export default UserProfile;
