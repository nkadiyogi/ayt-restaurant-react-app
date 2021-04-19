import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { xApiKey } from "../../envVariables";
import { notify } from "../../components/AlertNotification/util";

const About = () => {
	const [aboutUsContent, SetAboutUsContent] = useState(null);
	const [loading, setLoading] = useState(false);
	const getAboutUsData = () => {
		fetch("http://www.adiyogitechnosoft.com/restaurant/api/about_us", {
			method: "GET",
			headers: {
				"Access-Control-Allow-Origin": "*",
				"X-API-KEY": xApiKey,
			},
		})
			.then((res) => res.json())
			.then((result) => {
				if (result.status == false) {
					console.log("error", result);
					return notify(
						"getting error, please refresh page try after some time!!",
						result.msg
					);
				}
				console.log("result", result);

				setLoading(false);
				SetAboutUsContent(result.data.value);
			})
			.catch((err) => {
				console.log("err", err);
				notify(
					"failed to place order !!" + JSON.stringify(err),
					"warn"
				);
				setLoading(false);
			});
	};

	useEffect(() => {
		getAboutUsData();
	}, []);
	return (
		<div style={{ minHeight: "300px" }}>
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

			<div className="d-flex align-items-center">{aboutUsContent}</div>
		</div>
	);
};
export default About;
