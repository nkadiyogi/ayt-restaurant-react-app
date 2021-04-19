import React from "react";
import bgImg from "../../images/Login/pablo-merchan-montes-Orz90t6o0e4-unsplash.jpg";
import Signup from "./Signup";
const SignupContainer = () => {
	return (
		<div
			className="text-white signup-container"
			data-image-src={bgImg}
			style={{
				background: `url(${bgImg}) center center / cover no-repeat`,
				// 'url("http://placehold.it/1670x1200") center center / cover no-repeat',
			}}
		>
			<Signup />
		</div>
	);
};

export default SignupContainer;
