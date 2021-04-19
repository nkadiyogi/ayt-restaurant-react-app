import * as actioTypes from "./actionTypes";

const initialState = {
	loggedIn: false,
	loading: false,
	error: null,
	cityList: [],
	countryList:[
		{ id: 1, name: "India" },
		{ id: 2, name: "US" },
		{ id: 3, name: "Africa" },
		{ id: 4, name: "China" },
		{ id: 5, name: "Arab" },
	],
	stateList:[
		{ id: 1, name: "Maharastra" },
		{ id: 2, name: "Rajasthan" },
		{ id: 3, name: "UP" },
		{ id: 4, name: "Bihar" },
		{ id: 5, name: "Tripura" },
		{ id: 6, name: "Punjab" },
	]
};
const appReducer = (state = initialState, action) => {
	console.log("action", action);
	switch (action.type) {
		case actioTypes.LOGIN:
			return {
				...state,
				loggedIn: true,
				error: null,
			};
		case actioTypes.LOGIN_FALSE:
			return {
				...state,
				loggedIn: false,
				error: null,
			};
		case actioTypes.ALL_CITY_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};
		case actioTypes.ALL_CITY_REQUEST_SUCCESS:
			return {
				...state,
				loading: false,
				cityList: action.payload,
				error: null,
			};
		case actioTypes.ALL_CITY_REQUEST_FALED:
			return {
				...state,
				loading: false,
				cityList: [],
				error: action.payload,
			};
			// get all country 
			case actioTypes.ALL_COUNTRY_REQUEST:
				return {
					...state,
					loading: true,
					error: null,
				};
			case actioTypes.ALL_COUNTRY_REQUEST_SUCCESS:
				return {
					...state,
					loading: false,
					countryList: action.payload,
					error: null,
				};
			case actioTypes.ALL_COUNTRY_REQUEST_FALED:
				return {
					...state,
					loading: false,
					countryList: [],
					error: action.payload,
				};
			// get all states 
			case actioTypes.ALL_STATE_REQUEST:
				return {
					...state,
					loading: true,
					error: null,
				};
			case actioTypes.ALL_STATE_REQUEST_SUCCESS:
				return {
					...state,
					loading: false,
					stateList: action.payload,
					error: null,
				};
			case actioTypes.ALL_STATE_REQUEST_FALED:
				return {
					...state,
					loading: false,
					countryList: [],
					error: action.payload,
				};

		default:
			return state;
	}
};

export default appReducer;
