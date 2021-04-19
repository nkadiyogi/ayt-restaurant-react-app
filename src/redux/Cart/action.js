import * as actionsTypes from "./actionTypes";
import { notify } from "../../components/AlertNotification/util";
const xApiKey = process.env.REACT_APP_X_API_KEY;
const baseUrl = process.env.REACT_APP_API_BASE_URL;
console.log("react env cartactio.js ", baseUrl);
export const addToCart = (data) => {
	return {
		type: actionsTypes.Add_TO_CART,
		payload: data,
	};
};

export const increaseItemQuantity = (itemId) => {
	return {
		type: actionsTypes.INCREASE_QUANTITY,
		payload: itemId,
	};
};
export const decreaseItemQuantity = (itemId) => {
	return {
		type: actionsTypes.DECREASE_QUANTITY,
		payload: itemId,
	};
};

export const removeItem = (itemId) => {
	return {
		type: actionsTypes.REMOVE_ITEM,
		payload: itemId,
	};
};
//
export const checkout = () => {
	return {
		type: actionsTypes.CHECKOUT,
	};
};

export const setRestaurantId = (id) => {
	return {
		type: actionsTypes.SET_RETAURANT_ID,
		payload: id,
	};
};

export const clearCart = () => {
	return {
		type: actionsTypes.CLEAR_CART,
	};
};
export const setOrderMode = (modeId) => {
	return {
		type: actionsTypes.SET_ORDER_MODE,
		payload: modeId,
	};
};

// get table data
export const tableDataRequest = () => {
	return {
		type: actionsTypes.TABLE_DATA_REQUEST,
	};
};
export const tableDataRequestSuccess = (tableData) => {
	return {
		type: actionsTypes.TABLE_DATA_REQUEST_SUCCESS,
		payload: tableData,
	};
};
export const tableDataRequestFailed = (error) => {
	return {
		type: actionsTypes.TABLE_DATA_REQUEST_FAILED,
		payload: error,
	};
};

export const getTableData = (tableId,restaurantId) => {
	return (dispatch) => {
		dispatch(tableDataRequest());
		// fetch(
		// 	`${baseUrl}/api/order?user_id=${userId}`,
		// 	{
		// 		method: "GET",
		// 		headers: {
		// 			"X-API-KEY": xApiKey,
		// 			"Access-Control-Allow-Origin": "*",
		// 		},
		// 	}
		// )
		// 	.then((response) => response.json())
		// 	.then((result) => {
		// 		console.log("order fetch result", result);
		// 		if (result.status == false) {
		// 			notify(result.msg,'warn');
		// 			return dispatch(tableDataRequestFailed(result.msg));
		// 		} else {
		// 			dispatch(tableDataRequestSuccess(result.data));
		// 		}
		// 	})
		// 	.catch((err) => {
		// 		console.log("fetch failed error", err);
		// 		notify('error '+err.messege,'warn');
		// 		dispatch(tableDataRequestFailed(err.messege));
		// 	});
		setTimeout(() => {
			dispatch(
				tableDataRequestSuccess({
					tableNo: "12",
				})
				// tableDataRequestFailed('getting error')
			);
		}, 5000);
	};
};
export const resetTableData = () => {
	return {
		type: actionsTypes.RESET_TABLE_DATA,
	};
};
