import * as actioTypes from "./actionTypes";

const initialState = {
	restaurantCategory: [],
	selectedRestaurantCateId: "",
	restaurantList: [],
	loading: false,
	error: null,
	searchText: "",
	selectedCity: {
		id: "1",
		name: "Jaipur",
		country_id: "1",
		state_id: "1",
		status: "1",
		deleted: "0",
	},
	currentPage: "/",
};
const setSelectedCity = (state, action) => {
	if (action.payload)
		return {
			...state,
			selectedCity: action.payload,
		};
	return state;
};

const restaurantsReducer = (state = initialState, action) => {
	switch (action.type) {
		case actioTypes.SEARCH_REQUEST:
			console.log("action", action);
			return {
				...state,
				loading: true,
				error: null,
				restaurantList: [],
			};
		case actioTypes.SEARCH_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				restaurantList: action.payload,
			};
		case actioTypes.SEARCH_FAILED:
			return {
				...state,
				loading: false,
				error: action.payload,
				restaurantList: [],
			};
		case actioTypes.UpdateSecondryLink:
			return {
				...state,
				currentPage: action.payload,
			};
		// set restaurant list after fetching from server
		case actioTypes.SET_RESTAURANT_LIST:
			return {
				...state,
				restaurantList: action.payload,
				error: null,
			};
		case actioTypes.RESTAURANT_LIST_REQUEST_FAILED:
			return {
				...state,
				restaurantList: [],
				error: action.payload,
			};
		// restaurant category
		case actioTypes.SET_RESTAURANT_CATEGORY:
			return {
				...state,
				selectedRestaurantCateId: action.payload,
			};
		case actioTypes.CLEAR_RESTAURANT_CATEGORY_FILTER:
			return {
				...state,
				selectedRestaurantCateId: "",
			};
		case actioTypes.RESTAURANT_CATEGORY_REQUEST:
			return {
				...state,
				loading: true,
			};
		case actioTypes.RESTAURANT_CATEGORY_REQUEST_SUCCESS:
			return {
				...state,
				loading: false,
				restaurantCategory: action.payload,
			};
		case actioTypes.RESTAURANT_CATEGORY_REQUEST_FAILED:
			return {
				...state,
				loading: false,
				restaurantCategory: [],
				error: action.payload,
			};
		case actioTypes.SET_SELECTED_RESTAURANT_CITY:
			return setSelectedCity(state, action);
		default:
			return state;
	}
};
export default restaurantsReducer;
