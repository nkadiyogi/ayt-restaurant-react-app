import * as actionTypes from "./actionTypes";

import { notify } from "../../components/AlertNotification/util";

const xApiKey = "NODN2D0I7W4V8I2K";
export const clearUserData =()=>{
	return {
		type: actionTypes.CLEAR_USER_DATA,
	};
}

export const userRequest =()=>{
	return {
		type: actionTypes.FETCH_USER_REQUEST,
	};
}

export const userRequestSuccess =(user)=>{
	return {
		type: actionTypes.FETCH_USER_SUCCESS,
		payload:user
	};
}

export const userRequestFailed =(error)=>{
	return {
		type: actionTypes.FETCH_USER_FAILURE,
		payload:error
	};
}

export const getUserById = (userId) => {
	return (dispatch) => {
		dispatch(userRequest());
		fetch(
			`http://www.adiyogitechnosoft.com/restaurant/api/Users/${userId}`,
			{
				method: "GET",
				headers: {
					Accept: "*/*",
					"X-API-KEY": xApiKey,
					"Access-Control-Allow-Origin": "*",
				},
			}
		)
			.then((response) => response.json())
			.then((result) => {
				// console.log("USER fetch result", result);
				if (result.status == false) {
					notify("failed to fetch user " + result.msg, "warn");
					return dispatch(userRequestFailed(result.msg));
				} else {
					console.log('user data action.js',result.data[0])
					dispatch(userRequestSuccess(result.data[0]));
				}
			})
			.catch((err) => {
				console.log("fetch failed error", err);
				dispatch(userRequestFailed(err.message));
				notify("login failed" + err, "warn");
			});
	};
};

// ----------------
// fetch user all addresses

export const userAddressRequest =()=>{
	return {
		type: actionTypes.FETCH_USER_ADDRESS_REQUEST,
	};
}

export const userAddressRequestSuccess =(addressList)=>{
	return {
		type: actionTypes.FETCH_USER_ADDRESS_SUCCESS,
		payload:addressList
	};
}

export const userAddressRequestFailed =(error)=>{
	return {
		type: actionTypes.FETCH_USER_ADDRESS_FAILURE,
		payload:error
	};
}

export const getUserAddressById = (userId) => {
	return (dispatch) => {
		dispatch(userAddressRequest());
		fetch(
			`http://www.adiyogitechnosoft.com/restaurant/api/Customer_address?customer_id=${userId}&deleted=0`,
			{
				method: "GET",
				headers: {
					Accept: "*/*",
					"X-API-KEY": xApiKey,
					"Access-Control-Allow-Origin": "*",
				},
			}
		)
			.then((response) => response.json())
			.then((result) => {
				// console.log("USER fetch result", result);
				if (result.status == false) {
					notify("failed to fetch user addresss " + result.msg, "warn");
					return dispatch(userAddressRequestFailed(result.msg));
				} else {
					console.log('user address data action.js',result.data)
					dispatch(userAddressRequestSuccess(result.data));
				}
			})
			.catch((err) => {
				console.log("fetch failed error", err);
				dispatch(userAddressRequestFailed(err.message));
				notify("failed to fetch address" + err, "warn");
			});
	};
};
// ADD NEW ADDRESS


