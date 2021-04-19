import React, { useRef } from "react";
import { useState } from "react";
import * as authActions from "../../redux/auth/authActions";
import "./Signup.css";
import { useLocation } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { notify } from "../AlertNotification/util";
import { useRouteMatch, Link } from "react-router-dom";
const Signup = (props) => {
	const inputValidator = useRef(new SimpleReactValidator());
	const [user, setUser] = useState({
		firstname: "",
		lastname: "",
		mobile: "",
		gender: "",
		img: "",
		url: "",
		country: "",
		state: "",
		city: "",
		address: "",
		email: "",
	});
	const [error, setError] = useState(null);
	const [showSuccess, setShowSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const location = useLocation();
	const { url ,path} = useRouteMatch();
	const xApiKey = process.env.REACT_APP_X_API_KEY;

	const onChangeHandler = (event) => {
		setUser({ ...user, [event.target.name]: event.target.value });
	};
	const onSubmit = () => {
		setLoading(true);
		if (inputValidator.current.allValid()) {
			fetch("http://www.adiyogitechnosoft.com/restaurant/api/Users/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "*/*",
					"X-API-KEY": "NODN2D0I7W4V8I2K",
					"Access-Control-Allow-Origin": "*",
				},
				body: JSON.stringify(user),
			})
				.then((response) => response.json())
				.then((result) => {
					setLoading(false);
					console.log("Signup fetch result", result);
					if (result.status == false) {
						notify("Sign up failed " + result.msg, "warn");
					} else {
						notify("Signup success", "success");
						// dispatch action for set user profile to app state
						// set app to user is logged in
					}
				})
				.catch((err) => console.log("fetch failed error", err));
		} else {
			setLoading(false);
			notify("Please fill required field", "warn");
		}
	};
	console.log("route match signup",location.pathname);
	return (
		<div
			className={`${
				location.pathname.includes("/signup") ? "" : "signup"
			}`}
		>
			<h4
				className={`text-center ${
					location.pathname.includes("/signup") ? "text-white h1 mb-3" :'' 
				}`}
			>
				User Registration
			</h4>

			{/* ------ */}
			{location.pathname.includes("/signup") ? (
				<section className="contact-page inner-page">
					<div className="container">
						<div className="row">
							{/* REGISTER */}
							<div className="col-md-8">
								<div className="widget signup-bg">
									<div className="widget-body">
										<div>
											<div className="row">
												<div className="form-group col-sm-6">
													<label htmlFor="exampleInputEmail1">
														First Name
													</label>
													<input
														className="form-control"
														type="text"
														defaultValue="Artisanal kale"
														name="firstname"
														value={user.firstname}
														onChange={
															onChangeHandler
														}
														onFocus={() =>
															inputValidator.current.showMessageFor(
																"firstname"
															)
														}
													/>
													{inputValidator.current.message(
														"firstname",
														user.firstname,
														[
															"required",
															{ max: 20 },
															{ min: 3 },
														]
													)}
												</div>
												<div className="form-group col-sm-6">
													<label htmlFor="exampleInputEmail1">
														Last Name
													</label>
													<input
														className="form-control"
														type="text"
														defaultValue="Artisanal kale"
														id="example-text-input-2"
														value={user.lastname}
														name="lastname"
														onChange={
															onChangeHandler
														}
														onFocus={() =>
															inputValidator.current.showMessageFor(
																"lastname"
															)
														}
													/>
													{inputValidator.current.message(
														"lastname",
														user.lastname,
														[
															"required",
															{ max: 20 },
															{ min: 2 },
														]
													)}
												</div>
												<div className="form-group col-sm-6">
													<label htmlFor="exampleInputEmail1">
														Email
													</label>
													<input
														className="form-control"
														type="email"
														defaultValue="nk@mail.co"
														id="example-text-input-2"
														value={user.email}
														name="email"
														onChange={
															onChangeHandler
														}
														onFocus={() =>
															inputValidator.current.showMessageFor(
																"email"
															)
														}
													/>
													{inputValidator.current.message(
														"email",
														user.email,
														[
															"required",
															"email",
															{ max: 20 },
															{ min: 2 },
														]
													)}
												</div>
												<div className="form-group col-sm-6">
													<label htmlFor="exampleInputEmail1">
														Phone number
													</label>
													<input
														className="form-control"
														type="tel"
														defaultValue="1-(555)-555-5555"
														id="example-tel-input-3"
														value={user.mobile}
														name="mobile"
														onChange={
															onChangeHandler
														}
														onFocus={() =>
															inputValidator.current.showMessageFor(
																"mobile"
															)
														}
													/>
													{inputValidator.current.message(
														"mobile",
														user.mobile,
														[
															"required",
															{ max: 10 },
															{ min: 10 },
														]
													)}
													<small className="form-text text-white">
														We"ll never share your
														details with anyone
														else.
													</small>
												</div>
											</div>

											<div className="row">
												<div className="col-sm-4">
													<p>
														<button
															className="btn theme-btn d-flex"
															onClick={onSubmit}
															disabled={
																!user.mobile ||
																!user.firstname ||
																!user.lastname || !user.email
															}
														>
															Submit
															{loading && (
																<div className="ml-2 loader"></div>
															)}
														</button>
													</p>
												</div>
											</div>
										</div>
									</div>
									{/* end: Widget */}
								</div>
								{/* /REGISTER */}
							</div>
							{/* WHY? */}
							<div className="col-md-4">
								<h4 className="text-white">Registration is fast, easy, and free.</h4>
								<p className="text-white">Once you"re registered, you can:</p>
								<hr />
								<p />
								<div className="panel">
									<div className="panel-heading">
										<h4 className="panel-title text-white">
											<span
												data-parent="#accordion"
												data-toggle="collapse"
												className="panel-toggle collapsed"
												// href="#faq1"
												aria-expanded="false"
											>
												<i
													className="ti-info-alt"
													aria-hidden="true"
												/>
												Place order
											</span>
										</h4>
									</div>
								</div>
								{/* end:panel */}
								<div className="panel">
									<div className="panel-heading">
										<h4 className="panel-title text-white">
											<span
												data-parent="#accordion"
												data-toggle="collapse"
												className="panel-toggle"
												// href="#faq2"
												aria-expanded="true"
											>
												<i
													className="ti-info-alt"
													aria-hidden="true"
												/>
												Check your past orders
											</span>
										</h4>
									</div>
								</div>
								{/* end:Panel */}
								<h4 className="m-t-20 text-white">
									Contact Customer Support
								</h4>
								<p className="text-white">								
									If you"re looking for more help or have a
									question to ask, please{" "}
								</p>
								<p >
									<Link
										to="contact-us"
										className="btn theme-btn m-t-15 text-white"
									>
										contact us
									</Link>
								</p>
							</div>
							{/* /WHY? */}
						</div>
					</div>
				</section>
			) : (
				<>
					<div className="mt-3 mb-2">
						<div className="form-group mobile-row">
							<div className="col-xs-4 col-lg-4 col-xl-4 col-sm-4 px-0">
								<label className="pull-left mobile-label">
									First Name{" "}
									<span className="text-danger">*</span>
								</label>
							</div>
							<div className="col-xs-8 col-lg-8 col-xl-8 col-sm-8 px-0">
								<input
									type="text"
									className="form-control"
									placeholder="Yash"
									name="firstname"
									value={user.firstname}
									onChange={onChangeHandler}
									onFocus={() =>
										inputValidator.current.showMessageFor(
											"firstname"
										)
									}
								/>
								{inputValidator.current.message(
									"firstname",
									user.firstname,
									["required", { max: 20 }, { min: 3 }]
								)}
							</div>
						</div>
						<div className="form-group mobile-row">
							<div className="col-xs-4 col-lg-4 col-xl-4 col-sm-4 px-0">
								<label className="pull-left mobile-label">
									Last Name{" "}
									<span className="text-danger">*</span>
								</label>
							</div>
							<div className="col-xs-8 col-lg-8 col-xl-8 col-sm-8 px-0">
								<input
									type="text"
									className="form-control"
									name="lastname"
									placeholder="Sharma"
									value={user.lastname}
									onChange={onChangeHandler}
									onFocus={() =>
										inputValidator.current.showMessageFor(
											"lastname"
										)
									}
								/>
								{inputValidator.current.message(
									"lastname",
									user.lastname,
									["required", { max: 20 }, { min: 2 }]
								)}
							</div>
						</div>
						<div className="form-group mobile-row">
							<div className="col-xs-4 col-lg-4 col-xl-4 col-sm-4 px-0">
								<label className="pull-left mobile-label">
									Mobile{" "}
									<span className="text-danger">*</span>
								</label>
							</div>
							<div className="col-xl-8 col-lg-8 col-xs-8 col-sm-8 px-0">
								<input
									type="text"
									className="form-control"
									placeholder="9927473741"
									value={user.mobile}
									name="mobile"
									onChange={onChangeHandler}
									onFocus={() =>
										inputValidator.current.showMessageFor(
											"mobile"
										)
									}
								/>
								{inputValidator.current.message(
									"mobile",
									user.mobile,
									["required", { max: 10 }, { min: 10 }]
								)}
							</div>
						</div>
						{/*/form-group*/}
					</div>
					<button
						className="btn-success btn btn-block submit-button d-flex"
						onClick={onSubmit}
						disabled={
							!user.mobile || !user.firstname || !user.lastname
						}
					>
						Submit
						{loading && <div className="ml-2 loader"></div>}
					</button>{" "}
				</>
			)}
		</div>
	);
};

export default Signup;
