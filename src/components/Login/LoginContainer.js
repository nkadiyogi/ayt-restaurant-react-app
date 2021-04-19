import React from "react";
import Login from './Login';
import bgImg from '../../images/Login/pablo-merchan-montes-Orz90t6o0e4-unsplash.jpg'
const LoginContainer = () => {
	return (
		<div >

			<div className="text-white login-container" 
				// data-image-src="http://placehold.it/1670x1200"
				data-image-src={bgImg}
				style={{
					background:
						`url(${bgImg}) center center / cover no-repeat`,
						// 'url("http://placehold.it/1670x1200") center center / cover no-repeat',
				}}>

            <Login/>
				</div>
		</div>
	);
};

export default LoginContainer;
