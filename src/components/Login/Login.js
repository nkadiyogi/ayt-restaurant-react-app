import React, { useState, useEffect, useRef } from "react";
import Spinner from "../Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setLogout } from "../../redux/app/action";
import "./Login.css";
import {
	userLoginRequest,
	loginOtpVerifiRequest,
	userLogout,
} from "../../redux/auth/authActions";
import Notification from "../../components/AlertNotification/Notification";
import { useHistory, useLocation } from "react-router-dom";
import { notify } from "../AlertNotification/util";
import SimpleReactValidator from "simple-react-validator";
const Login = (props) => {
	const dispatch = useDispatch();
	const [mobile, setMobileNum] = useState("");
	const [otp, setOtp] = useState("");
	const [showAlert, setShowAlert] = useState(false);
	const [alert, setAlert] = useState({ type: "success", messege: "Success" });
	const location = useLocation();

	const authState = useSelector((state) => state.authReducer);
	const inputValidator = useRef(new SimpleReactValidator());
	useEffect(() => {
		authState.loginRequestSuccess && notify(authState.msg, "success");
	}, [authState.loginRequestSuccess]);

	useEffect(() => {
		authState.error && notify("Login failed " + authState.error, "warn");
	}, [authState.error]);

	const onverifyOtp = () => {
		dispatch(loginOtpVerifiRequest({ mobile, otp }));
	};
	const onLoginSubmit = () => {
		dispatch(userLoginRequest({ mobile }));
	};
	console.log("location ", location);

	const style = {
		submitButton: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		login:{
			outline: '1px solid'
		}
	};

	return (
		<div className="login pb-3 mt-3" style={location.pathname.includes('/log-in')? style.login:null}>
			<div className="login-header">
				<h4 className="text-center mb-0">User Login</h4>
			</div>
			<div className="mb-2">
				<div className="form-group mobile-row">
					<div className="col-xs-3 col-xl-3 col-sm-3 px-0">
						<label className="pull-left mobile-label">
							Mobile <span className="text-danger">*</span>
						</label>
					</div>
					<div className="col-xs-9 col-xl-9 col-sm-9 px-0">
						<input
							type="text"
							className="form-control"
							disabled={authState.loginRequestSuccess}
							placeholder="123-345-3322"
							value={mobile}
							name="mobile"
							onChange={(e) => setMobileNum(e.target.value)}
							onFocus={() =>
								inputValidator.current.showMessageFor("mobile")
							}
						/>
						{inputValidator.current.message("mobile", mobile, [
							"required",
							{ max: 10 },
							{ min: 10 },
						])}
					</div>
				</div>
				<div className="form-group mobile-row">
					<div className="col-xs-3 col-xl-3 col-sm-3 px-0">
						<label className="pull-left mobile-label">OTP</label>
					</div>
					<div className="col-xs-9 col-xl-9 col-sm-9 px-0">
						<input
							type="text"
							className="form-control"
							placeholder="xxxx"
							disabled={!authState.loginRequestSuccess}
							value={otp}
							name="otp"
							onChange={(e) => setOtp(e.target.value)}
							onFocus={() =>
								inputValidator.current.showMessageFor("otp")
							}
						/>
						{inputValidator.current.message("otp", otp, [
							"required",
							{ max: 4 },
							{ min: 4 },
						])}
					</div>
				</div>
				{/*/form-group*/}
			</div>

			<div className="col-sm-12 px-0 login-buttons">
				{!authState.loginRequestSuccess && (
					<button
						className="btn-success btn btn btn-success btn-block"
						style={style.submitButton}
						disabled={authState.loading || mobile.length < 10}
						onClick={() => {
							onLoginSubmit();
						}}
					>
						Login {authState.loading && <Spinner />}
					</button>
				)}
				{authState.loginRequestSuccess && (
					<button
						disabled={authState.loading || otp.length < 3}
						className="btn btn-success btn-block"
						style={style.submitButton}
						onClick={() => {
							onverifyOtp();
						}}
					>
						Verify OTP
						{authState.loading && <Spinner />}
					</button>
				)}
				<button
					className="btn theme-btn btn-sm ml-1"
					onClick={() => dispatch(userLogout())}
				>
					Reset
				</button>
			</div>
		</div>
	);
};

export default Login;
