import * as actionTypes from "./authActionTypes";
import { setLogin } from "../app/action";
import { notify } from '../../components/AlertNotification/util';
import {getUserById,getUserAddressById } from '../user/actions';
const xApiKey = "NODN2D0I7W4V8I2K";

export const userLogout = () => {
	return {
		type: actionTypes.LOG_OUT,
	};
};

export const loginRequest = () => {
	return {
		type: actionTypes.LOGIN_REQUEST,
	};
};
export const loginRequestSuccess = (otp) => {
	return {
		type: actionTypes.LOGIN_REQUEST_SUCCESS,
		payload: otp,
	};
};
export const loginFailed = (error) => {
	return {
		type: actionTypes.LOGIN_REQUEST_FAILED,
		payload: error,
	};
};
// otp verification
export const loginOtpRequest = () => {
	return {
		type: actionTypes.LOGIN_OTP_VERIFI_REQUEST,
	};
};
export const loginOtpVeifiSuccess = (user) => {
	return {
		type: actionTypes.LOGIN_OTP_VERIFED_SUCCESS,
		payload: user,
	};
};

export const userLoginRequest = (user) => {
	return (dispatch) => {
		dispatch(loginRequest());
		fetch(
			"http://www.adiyogitechnosoft.com/restaurant/api/Users/user_login",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "*/*",
					"X-API-KEY": xApiKey,
					"Access-Control-Allow-Origin": "*",
				},
				body: JSON.stringify(user),
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log("login fetch result", result);
				if (result.status == false) {
					notify('login failed '+result.msg,'warn')
					return dispatch(loginFailed(result.msg));
				} else {
					// notify('login success '+result.data.otp,'warn')
					dispatch(loginRequestSuccess(result.data.otp));
				}
			})
			.catch((err) => {
				console.log("fetch failed error", err);
				dispatch(loginFailed(JSON.stringify(err)));
				notify('login failed'+err,'warn')
			});
	};
};

// agrs @user = {mobile,otp}
export const loginOtpVerifiRequest = (user) => {
	return (dispatch) => {
		dispatch(loginOtpRequest());
		fetch(
			"http://www.adiyogitechnosoft.com/restaurant/api/Users/verify_otp",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "*/*",
					"X-API-KEY": xApiKey,
					"Access-Control-Allow-Origin": "*",
				},
				body: JSON.stringify(user),
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log("otp verifi fetch result", result);
				if (result.status == false) {
					return dispatch(loginFailed(result.msg));
					if (window && window.localStorage) {
						localStorage.removeItem("auth");
					}
				} else {
					dispatch(loginOtpVeifiSuccess(result.data[0]));
					dispatch(setLogin(result.data[0]));
					dispatch(getUserById(result.data[0].id))
					dispatch(getUserAddressById(result.data[0].id))
					if (window && window.localStorage) {
						localStorage.setItem("auth", JSON.stringify(result.data[0]));
					}
				}
			})
			.catch((err) => {
				console.log("fetch failed error", err);
				dispatch(loginFailed(JSON.stringify(err)));
			});
	};
};
