import * as actioTypes from "./actionTypes";

const initialState = {
	orders: [
		{
			id: "1",
			order_id: "Q4L87s8C",
			restaurant_id: "NODC2Y8R3R8X8S",
			table_id: "4",
			shipping_charge: "0",
			total_amount: "454",
			discount: "100",
			discount_per: "18",
			coupon_code_applied: "0",
			coupon_id: "0",
			tax_id: "2",
			total_tax: "18",
			net_amt: "2215.72",
			user_id: "5",
			transaction_id: "44582663310",
			payment_id: "O1G3sdZ4I",
			order_mode: "0",
			payment_mode: "0",
			order_date: "0000-00-00 00:00:00",
			order_status: "0",
		}
	],
	loading: false,
	error: "",
};
const orderRequestSuccess = (state, action) => {
	return {
		orders: action.payload,
		loading: false,
		error: "",
	};
};
const orderRequestFailed = (error) => {
	return {
		orders: [],
		loading: false,
		error: error,
	};
};
const orderRequest = (state) => {
	return {
		...state,
		loading: true,
		error: "",
	};
};

const ordersReducer = (state = initialState, action) => {
	switch (action.type) {
		case actioTypes.ORDER_REQUEST:
			return orderRequest(state);
		case actioTypes.ORDER_REQUEST_SUCCESS:
			return orderRequestSuccess(state, action);
		case actioTypes.ORDER_REQUEST_FAILED:
			return orderRequestFailed(action.payload);
		default:
			return state;
	}
};

export default ordersReducer;
