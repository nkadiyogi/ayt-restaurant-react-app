import React from "react";
import { useState, useRef } from "react";
import { xApiKey } from "../../envVariables";
import { notify } from "../../components/AlertNotification/util";
import Spinner from "../../components/Spinner/Spinner";
import SimpleReactValidator from "simple-react-validator";
const Contact = () => {
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
					if (result.error) {
						console.log("error", result);
						return notify("getting error !!", result.error);
					}
					console.log("result", result);
					notify("Details submitted,Thank you !!", "success");
					setLoading(false);
				})
				.catch((err) => {
					console.log("err", err);
					notify("failed to submit !!", "warn");
					setLoading(false);
				});
		} else {
			inputValidator.current.showMessages();
			notify("Please fill required field", "warn");
		}
	};
	console.log("contact Data", contactData);
	return (
		<div>
			{" "}
			<section
				className="bg-image space-md"
				data-image-src="https://picsum.photos/1670/680/?random"
				style={{
					background:
						'url("https://picsum.photos/1670/680/?random") center center / cover no-repeat',
				}}
			>
				<div className="profile">
					<div className="container">
						<div className="row">
							<div className="col-xs-12 col-sm-4  col-lg-4 profile-img">
								<h1 className="font-white">About us </h1>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className="row">
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
												onBlur={inputValidator.current.showMessageFor(
													"name"
												)}
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
												onBlur={inputValidator.current.showMessageFor(
													"email"
												)}
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
												onBlur={inputValidator.current.showMessageFor(
													"subject"
												)}
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
												onBlur={inputValidator.current.showMessageFor(
													"msg"
												)}
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
						<li>Buy, sell, and interact with other members.</li>
						<li>Save your favorite searches and get notified.</li>
						<li>Watch the status of up to 200 items.</li>
						<li>
							View yourinformation from any computer in the world.
						</li>
						<li>Connect with the Atropos community.</li>
					</ul>
					<hr />
					<div className="panel">
						<div className="panel-heading">
							<h4 className="panel-title">
								<a
									data-parent="#accordion"
									data-toggle="collapse"
									className="panel-toggle collapsed"
									href="#faq1"
									aria-expanded="false"
								>
									<i
										className="ti-info-alt"
										aria-hidden="true"
									></i>
									Can I viverra sit amet quam eget lacinia?
								</a>
							</h4>
						</div>
						<div
							className="panel-collapse collapse"
							id="faq1"
							role="article"
							style={{ height: "0px" }}
						>
							<div className="panel-body">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Etiam rutrum ut erat a
								ultricies. Phasellus non auctor nisi, id aliquet
								lectus. Vestibulum libero eros, aliquet at
								tempus ut, scelerisque sit amet nunc. Vivamus id
								porta neque, in pulvinar ipsum. Vestibulum sit
								amet quam sem. Pellentesque accumsan consequat
								venenatis. Pellentesque sit amet justo dictum,
								interdum odio non, dictum nisi. Fusce sit amet
								turpis eget nibh elementum sagittis. Nunc
								consequat lacinia purus, in consequat neque
								consequat id.
							</div>
						</div>
					</div>
					{/* <!-- end:panel --> */}
					<div className="panel">
						<div className="panel-heading">
							<h4 className="panel-title">
								<a
									data-parent="#accordion"
									data-toggle="collapse"
									className="panel-toggle"
									href="#faq2"
									aria-expanded="true"
								>
									<i
										className="ti-info-alt"
										aria-hidden="true"
									></i>
									Can I viverra sit amet quam eget lacinia?
								</a>
							</h4>
						</div>
						<div
							className="panel-collapse collapse"
							id="faq2"
							aria-expanded="true"
							role="article"
						>
							<div className="panel-body">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Etiam rutrum ut erat a
								ultricies. Phasellus non auctor nisi, id aliquet
								lectus. Vestibulum libero eros, aliquet at
								tempus ut, scelerisque sit amet nunc. Vivamus id
								porta neque, in pulvinar ipsum. Vestibulum sit
								amet quam sem. Pellentesque accumsan consequat
								venenatis. Pellentesque sit amet justo dictum,
								interdum odio non, dictum nisi. Fusce sit amet
								turpis eget nibh elementum sagittis. Nunc
								consequat lacinia purus, in consequat neque
								consequat id.{" "}
							</div>
						</div>
					</div>
					{/* <!-- end:Panel --> */}
				</div>

				{/* <!-- /WHY? --> */}
			</div>
		</div>
	);
};

export default Contact;
