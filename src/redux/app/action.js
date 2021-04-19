import * as actionsTypes from "./actionTypes";
const xApiKey = "NODN2D0I7W4V8I2K";
export const setLogin = () => {
	return {
		type: actionsTypes.LOGIN,
	};
};

export const setLogout = () => {
	return {
		type: actionsTypes.LOGIN_FALSE,
	};
};
export const allCityRequest = () => {
	return {
		type: actionsTypes.ALL_CITY_REQUEST,
	};
};

export const allCityRequestFailed = (error) => {
	return {
		type: actionsTypes.ALL_CITY_REQUEST_FALED,
		payload: error,
	};
};
export const allCityRequestSuccess = (data) => {
	return {
		type: actionsTypes.ALL_CITY_REQUEST_SUCCESS,
		payload: data,
	};
};
export const getAllCityList = () => {
	return (dispatch) => {
		dispatch(allCityRequest());
		fetch("http://www.adiyogitechnosoft.com/restaurant/api/Citys", {
			headers: {
		
				"X-API-KEY": xApiKey,
			},
		})
			.then((res) => res.json())
			.then((result) => {
				if (result.status == false) {
					return dispatch(allCityRequestFailed(result.error));
				}
				dispatch(allCityRequestSuccess(result.data));
			})
			.catch((err) => {
				console.log("err", err);
				dispatch(allCityRequestFailed(JSON.stringify(err)));
			});
	};
};

// get all country list

export const allCountryRequest = () => {
	return {
		type: actionsTypes.ALL_COUNTRY_REQUEST,
	};
};

export const allCountryRequestFailed = (error) => {
	return {
		type: actionsTypes.ALL_COUNTRY_REQUEST_FALED,
		payload: error,
	};
};
export const allCountryRequestSuccess = (data) => {
	return {
		type: actionsTypes.ALL_COUNTRY_REQUEST_SUCCESS,
		payload: data,
	};
};
export const getAllCountryList = () => {
	return (dispatch) => {
		dispatch(allCountryRequest());
		fetch("http://www.adiyogitechnosoft.com/restaurant/api/country", {
			headers: {
				'Access-Control-Allow-Origin':'*',
				"X-API-KEY": xApiKey,
			},
		})
			.then((res) => res.json())
			.then((result) => {
				if (result.status == false) {
					return dispatch(allCountryRequestFailed(result.error));
				}
				dispatch(allCountryRequestSuccess(result.data));
			})
			.catch((err) => {
				console.log("err", err);
				dispatch(allCountryRequestFailed(err));
			});
	};
};

// get all state list

export const allStateRequest = () => {
	return {
		type: actionsTypes.ALL_STATE_REQUEST,
	};
};

export const allStateRequestFailed = (error) => {
	return {
		type: actionsTypes.ALL_STATE_REQUEST_FALED,
		payload: error,
	};
};
export const allStateRequestSuccess = (data) => {
	return {
		type: actionsTypes.ALL_STATE_REQUEST_SUCCESS,
		payload: data,
	};
};
export const getAllStateList = () => {
	return (dispatch) => {
		dispatch(allStateRequest());
		fetch("http://www.adiyogitechnosoft.com/restaurant/api/states", {
			headers: {
				"X-API-KEY": xApiKey,
			},
		})
			.then((res) => res.json())
			.then((result) => {
				if (result.status == false) {
					return dispatch(allStateRequestFailed(result.error));
				}
				dispatch(allStateRequestSuccess(result.data));
			})
			.catch((err) => {
				console.log("err", err);
				dispatch(allStateRequestFailed(err));
			});
	};
};
