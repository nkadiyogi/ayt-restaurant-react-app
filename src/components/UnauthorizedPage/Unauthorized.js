import React from "react";
import "./Unauthorized.css";
import unAuthImg from "../../images/auth/401-error-1024x512.jpg";
import { useRouteMatch,Link } from 'react-router-dom';

const Unauthorized = () => {
	const {url,path} = useRouteMatch()
	return (
		<div className="main-div p-1">
			<div className="card box-shadow card-container pt-2">
				<div className="row">
						<div className="card-body pt-3 text-center mx-auto">
							<h1 className="card-title h1 text-danger">
								Unauthorized Access
							</h1>
							<p className="card-text">
								{" "}
								Sorry You'r not allowed to view this page
								,please login and visit again.{" "}
							</p>
							<h6 className="card-text mb-2">
								{" "}
								Thank you ,Have a nice day!{" "}
							</h6>
							<div className="card-text">
								<Link className="btn btn-primary" to="log-in">
									Login
								</Link>
							</div>
						</div>
				
                    {/* <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3">
                    </div>
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3">
						<img
							src={unAuthImg}
							alt="unauth"
							className="img-fluid"
						/>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default Unauthorized;
