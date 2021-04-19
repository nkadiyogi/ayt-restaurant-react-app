import React from "react";
import { useState, useRef } from "react";
import { xApiKey } from "../../envVariables";
import { notify } from "../../components/AlertNotification/util";
import Spinner from "../../components/Spinner/Spinner";
import SimpleReactValidator from "simple-react-validator";
import defaultImg from "../../images/image-not-found1.png";
import contactUsImg from '../../images/Carasual_img/slider1.jpg';
const RestaurantContactUs = (props) => {
	const inputValidator = useRef(new SimpleReactValidator());
	const [contactData, setContactData] = useState({
		name: "",
		email: "",
		subject: " ",
		msg: " ",
	});
	const [loading, setLoading] = useState(false);

	const onChangeHandler = (event) => {
		setContactData({
			...contactData,
			[event.target.name]: event.target.value,
		});
	};
	const onSubmitHandler = () => {
		console.log("onSubmitHandler [resContactUs]");
		if (inputValidator.current.allValid()) {
			setLoading(true);
			const config = {
				method: "POST",
				headers: {
					Accept: "*/*",
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json",
					"X-API-KEY": xApiKey,
				},
				body: JSON.stringify(contactData),
			};
			fetch(
				"http://www.adiyogitechnosoft.com/restaurant/api/contact_us",
				{
					...config,
				}
			)
				.then((res) => res.json())
				.then((result) => {
					setLoading(false);
					if (result.status == false) {
						console.log("error", result.msg);
						return notify("getting error !!", result.msg);
					}
					console.log("result", result);
					notify("Details submitted,Thank you !!", "success");
				})
				.catch((err) => {
					setLoading(false);
					console.log("err", err);
					notify("failed to submit !!", "warn");
				});
		} else {
			// inputValidator.current.showMessages();
			notify("Please fill required field", "warn");
		}
	};
	// console.log("contactus", props);
	return (
		<div>
			<section
				className="bg-image space-md"
				data-image-src={contactUsImg}
				// data-image-src="https://picsum.photos/1670/680/?random"
				style={{
					// background: `url("https://picsum.photos/1670/680/?random"),url(${defaultImg}) center center / cover no-repeat`,
					background: `url(${contactUsImg}),url(${defaultImg}) center center / cover no-repeat`,
				}}
			>
				<div className="text-center">
					<h1 className="text-white font-weight-bold">Contact us </h1>
				</div>
			</section>
			<div className="row container mt-3">
				{/* <!-- REGISTER --> */}
				<div className="col-md-8">
					<div className="widget">
						<div className="widget-body">
							{/* <!-- Contact form --> */}
							<div
								className="form-horizontal contact-form"
								role="form"
							>
								<fieldset>
									<div className="row form-group">
										<div className="col-xs-6">
											<input
												className="form-control"
												id="name"
												name="name"
												type="text"
												value={contactData.name}
												disabled={loading}
												placeholder="Full Name *"
												onChange={onChangeHandler}
												onFocus={() =>
													inputValidator.current.showMessageFor(
														"name"
													)
												}
											/>
											{inputValidator.current.message(
												"name",
												contactData.name,
												"required|min:3|max:120",
												{ className: "text-danger sm" }
											)}
										</div>
									</div>
									<div className="row form-group">
										<div className="col-xs-6">
											<input
												className="form-control"
												id="email"
												name="email"
												type="email"
												value={contactData.email}
												placeholder="Email *"
												disabled={loading}
												onChange={onChangeHandler}
												onFocus={() =>
													inputValidator.current.showMessageFor(
														"email"
													)
												}
											/>
											{inputValidator.current.message(
												"email",
												contactData.email,
												"required|email",
												{ className: "text-danger sm" }
											)}
										</div>
									</div>
									<div className="row form-group">
										<div className="col-xs-12">
											<input
												className="form-control"
												name="subject"
												type="text"
												value={contactData.subject}
												placeholder="Subject *"
												disabled={loading}
												onChange={onChangeHandler}
												onFocus={() =>
													inputValidator.current.showMessageFor(
														"subject"
													)
												}
											/>
											{inputValidator.current.message(
												"subject",
												contactData.subject,
												"required|min:3|max:120",
												{
													className:
														"text-danger text-sm",
												}
											)}
										</div>
									</div>
									<div className="row form-group">
										<div className="col-xs-12">
											<textarea
												className="form-control"
												name="msg"
												rows="10"
												value={contactData.msg}
												placeholder="Message *"
												disabled={loading}
												onChange={onChangeHandler}
												onFocus={() =>
													inputValidator.current.showMessageFor(
														"msg"
													)
												}
											></textarea>
											{inputValidator.current.message(
												"msg",
												contactData.msg,
												"required|min:10|max:120",
												{
													className:
														"text-danger text-sm",
												}
											)}
										</div>
									</div>
									<div className="row form-group">
										<div className="col-xs-12 d-flex align-items-center">
											<button
												className="btn btn-lg theme-btn"
												type="submit"
												disabled={loading}
												onClick={onSubmitHandler}
											>
												Send Message
											</button>
											{loading && <Spinner />}
										</div>
									</div>
								</fieldset>
							</div>
							{/* <!-- End Contact form --> */}
						</div>
					</div>
					{/* <!-- end: Widget --> */}
				</div>
				{/* <!-- /REGISTER --> */}
				{/* <!-- WHY? --> */}
				<div className="col-md-4">
					<h4>Registration is fast, easy, and free.</h4>
					<p>Once you"re registered, you can:</p>
					<ul className="list-check list-unstyled">
						<li>Order food .</li>
						<li>Check your past orders.</li>
						<li>
							View your information from any computer in the world.
						</li>
					</ul>
					<hr />
												
				</div>
		
			</div>
		
		</div>
	);
};

export default RestaurantContactUs;
