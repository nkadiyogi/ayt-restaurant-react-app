import * as actionTypes from "./actionTypes";
const userObj = {
	id: "",
	restaurant_id: "",
	unique_id: "",
	firstname: "",
	lastname: "",
	mobile: "",
	otp: "",
	gender: "",
	img: "",
	url: "",
	email: "",
	datetime: "",
	deleted: "",
	status: "",
	addressId: "",
	address: "",
	pincode: "",
	country: "",
	city: "",
	state: "",
};
const initialState = {
	user: { ...userObj },
	addressList: [
		{
			id: "3",
			customer_id: "2",
			country: "1",
			state: "1",
			city: "2",
			address: "Clock tawar",
			default: "1",
			pin_code: "362001",
			status: "1",
			deleted: "0",
			city_name: "Jaipur",
			state_name: "Rajasthan",
			country_name: "India",
		},
		{
			id: "4",
			customer_id: "2",
			country: "1",
			state: "2",
			city: "5",
			address: "32 Housng board Opp Krishna Hospital",
			default: "0",
			pin_code: "342001",
			status: "1",
			deleted: "0",
			city_name: "Ahamdabad",
			state_name: "Gujrat",
			country_name: "India",
		},
	],
	loading: false,
	addressLoading: false,
	msg: null,
	error: "",
};
const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_USER_REQUEST:
			return {
				...state,
				loading: true,
				user: { ...userObj },
				error: "",
			};
		case actionTypes.FETCH_USER_SUCCESS:
			return {
				...state,
				loading: false,
				user: { ...state.user, ...action.payload },
				error: "",
			};
		case actionTypes.FETCH_USER_FAILURE:
			return {
				...state,
				loading: false,
				user: { ...userObj },
				error: action.payload,
				msg: null,
			};
		case actionTypes.SET_USER_DATA:
			return {
				...state,
				user: action.payload,
			};
		case actionTypes.CLEAR_USER_DATA:
			return {
				...state,
				user: { ...userObj },
				loading: false,
				msg: null,
				error: "",
			};
		// ------user addresses
		case actionTypes.FETCH_USER_ADDRESS_REQUEST:
			return {
				...state,
				// addressList: [],
				addressLoading: true,
				msg: null,
				error: "",
			};
		case actionTypes.FETCH_USER_ADDRESS_SUCCESS:
			return {
				...state,
				addressList: action.payload,
				addressLoading: false,
				msg: null,
				error: "",
			};
		case actionTypes.FETCH_USER_ADDRESS_FAILURE:
			return {
				...state,
				addressList: [],
				addressLoading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default userReducer;
