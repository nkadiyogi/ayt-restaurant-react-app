import * as actionsTypes from "./actionTypes";
import {
	productStock,
	productCategory,
	products,
	restaurantList,
} from "../staticData";
import { setRestaurantId } from "../Cart/action";
export const setRestaurant = (restaurantObj) => {
	return {
		type: actionsTypes.RESTAURANT_SUCCESS,
		payload: restaurantObj,
	};
};

export const restaurantProductRequest = () => {
	return {
		type: actionsTypes.PRODUCT_REQUEST,
	};
};
export const restaurantProductRequestSuccess = (data) => {
	return {
		type: actionsTypes.PRODUCT_REQUEST_SUCCESS,
		payload: data,
	};
};

export const restaurantProductRequestFailed = (error) => {
	return {
		type: actionsTypes.PRODUCT_REQUEST_FAILED,
		payload: error,
	};
};

export const getRestaurantProducts = (restaurantId) => {
	return (dispatch) => {
		dispatch(restaurantProductRequest());
		fetch(
			`http://www.adiyogitechnosoft.com/restaurant/api/products?restaurant_id=${restaurantId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "*/*",
					"X-API-KEY": process.env.REACT_APP_X_API_KEY,
					"Access-Control-Allow-Origin": "*",
				},
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log("response", result);
				if (result.status == false) {
					return dispatch(restaurantProductRequestFailed(result.msg));
				}
				dispatch(restaurantProductRequestSuccess(result.data));
			})
			.catch((err) => {
				console.log("err", err);
				dispatch(restaurantProductRequestFailed(JSON.stringify(err)));
			});
	};
};

export const setProductCategory = (productCategoryId) => {
	return {
		type: actionsTypes.SET_PRODUCT_CATEGORY,
		payload: productCategoryId,
	};
};
export const restaurantProductRequestCategory = () => {
	return {
		type: actionsTypes.PRODUCT_CATEGORY_REQUEST,
	};
};
export const restaurantProductCategoryReq_Success = (data) => {
	return {
		type: actionsTypes.PRODUCT_CATEGORY_REQUEST_SUCCESS,
		payload: data,
	};
};
export const restaurantProductCategoryReq_Failed = () => {
	return {
		type: actionsTypes.PRODUCT_CATEGORY_REQUEST_FAILED,
	};
};
export const getRestaurantProductsCategory = () => {
	return (dispatch) => {
		dispatch(restaurantProductRequestCategory());

		fetch(`http://www.adiyogitechnosoft.com/restaurant/api/Category`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "*/*",
				"X-API-KEY": process.env.REACT_APP_X_API_KEY,
				"Access-Control-Allow-Origin": "*",
			},
		})
			.then((response) => response.json())
			.then((result) => {
				console.log("response", result);
				if (result.status == false) {
					return dispatch(
						restaurantProductCategoryReq_Failed(result.msg)
					);
				}
				dispatch(
					dispatch(restaurantProductCategoryReq_Success(result.data))
				);
			})
			.catch((err) => {
				console.log("err", err);
				restaurantProductCategoryReq_Failed(err);
			});
	};
};

export const clearProCategoryFilter = () => {
	return {
		type: actionsTypes.CLEAR_PRODUCT_CATEGORY_FILTER,
	};
};

// get restaurant profile
export const restaurantRequest = () => {
	return {
		type: actionsTypes.RESTAURANT_REQUEST,
	};
};
export const restaurantRequestSuccess = (profile) => {
	return {
		type: actionsTypes.RESTAURANT_SUCCESS,
		payload: profile,
	};
};
export const restaurantRequestFailed = (error) => {
	return {
		type: actionsTypes.RESTAURANT_REQUEST_FAILED,
		payload: error,
	};
};

export const getRestaurantByURL = (restaurantURL) => {
	return (dispatch) => {
		dispatch(restaurantRequest());
		fetch(
			`http://www.adiyogitechnosoft.com/restaurant/api/Restaurant?url=${restaurantURL}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "*/*",
					"X-API-KEY": process.env.REACT_APP_X_API_KEY,
					"Access-Control-Allow-Origin": "*",
				},
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log("response", result);
				if (result.status == false) {
					return dispatch(restaurantRequestFailed(result.msg));
				}
				// getting restaurant data after fetching ,restaurant profile
				dispatch(restaurantRequestSuccess(result.data[0]));
				const { unique_id } = result.data[0];
				dispatch(setRestaurantId(unique_id));
				dispatch(getRestaurantProducts(unique_id));
				dispatch(getSliderData(unique_id));
			})
			.catch((err) => {
				console.log("err", err);
				dispatch(restaurantRequestFailed(JSON.stringify(err.messege)));
			});
	};
};

// change restaurant status open or closed
export const changeRestaurantStatus = (status) => {
	return {
		type: actionsTypes.CHANGE_RESTAURANT_STATUS,
		payload: status,
	};
};

export const setSliderData = (sliderData) => {
	return {
		type: actionsTypes.SET_SLIDER_DATA,
		payload: sliderData,
	};
};

export const slderRequest = () => {
	return {
		type: actionsTypes.SLIDER_REQUEST,
	};
};
export const slderRequestFailed = (error) => {
	return {
		type: actionsTypes.SLIDER_REQUEST_FAILED,
		payload:error
	};
};
export const getSliderData = (restaurantId) => {
	return (dispatch) => {
		dispatch(slderRequest());
		fetch(
			`http://www.adiyogitechnosoft.com/restaurant/api/Restaurant_slider?restaurant_id=${restaurantId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "*/*",
					"X-API-KEY": process.env.REACT_APP_X_API_KEY,
					"Access-Control-Allow-Origin": "*",
				},
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log("response", result);
				if (result.status == false) {
					return dispatch(slderRequestFailed(result.msg));
				}
				dispatch(setSliderData(result.data[0]));
			})
			.catch((err) => {
				console.log("err", err);
				dispatch(slderRequestFailed(JSON.stringify(err)));
			});
	};
};
