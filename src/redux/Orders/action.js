import * as actionsTypes from "./actionTypes";
import { notify } from '../../components/AlertNotification/util';
const xApiKey = "NODN2D0I7W4V8I2K";
export const orderRequest = () => {
	return {
		type: actionsTypes.ORDER_REQUEST,
	};
};
export const orderRequestSuccess = (orders) => {
	return {
		type: actionsTypes.ORDER_REQUEST_SUCCESS,
		payload:orders
	};
};
export const orderRequestFailed = (error) => {
	return {
		type: actionsTypes.ORDER_REQUEST_FAILED,
		payload:error
	};
};

export const getClientOrders = (userId)=>{
	return dispatch =>{
		dispatch(orderRequest());
		fetch(
			`http://www.adiyogitechnosoft.com/restaurant/api/order?user_id=${userId}`,
			{
				method: "GET",
				headers: {
					"X-API-KEY": xApiKey,
					"Access-Control-Allow-Origin": "*",
				},
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log("order fetch result", result);
				if (result.status == false) {
					notify(result.msg,'warn');
					return dispatch(orderRequestFailed(result.msg));
				} else {
					dispatch(orderRequestSuccess(result.data));
				}
			})
			.catch((err) => {
				console.log("fetch failed error", err);
				notify('error '+err.messege,'warn');
				dispatch(orderRequestFailed(err.messege));
			});
	}
}



