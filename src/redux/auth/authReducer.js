import * as actionTypes from "./authActionTypes";

const initialState = {
	loading: false,
	// when otp genreted success
	loginRequestSuccess: false,
	// when otp verified
	loginSuccess: false,
	user: {
		firstName: "Narendra",
		lastName: "Malviya",
		email: "nk@mail.com",
		mobile: "+917742401557",
		address: "jodhpur rajasthan",
		countryId: 1,
		country: "India",
		stateId: 2,
		state: "Rajasthan",
		cityId: 1,
		city: "Jodhpur",
		pincode: 306401,
	},
	msg:null,
	error: "",
};
const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOGIN_REQUEST:
			return {
				...state,
				loginRequestSuccess: false,
				// when otp verified
				loginSuccess: false,
				loading: true,
				error:''
			};

		case actionTypes.LOGIN_REQUEST_SUCCESS:
			return {...state,
				loading: false,
				loginRequestSuccess: true,
				loginSuccess: false,
				error: "",
				msg:action.payload
			};
		case actionTypes.LOGIN_OTP_VERIFI_REQUEST:
			return {
				...state,
				loading: true,
				error: "",
			};
		case actionTypes.LOGIN_OTP_VERIFED_SUCCESS:
			return {...state,
				loading: false,
				loginSuccess: true,
				user: action.payload,
				error: "",
				msg:null
			};
		case actionTypes.LOGIN_REQUEST_FAILED:
			return {...state,
				loading: false,
				loginSuccess: false,
				user: {
					name: "",
					mobile: "",
					gender: "",
					img: "",
					url: "",
					country: "",
					state: "",
					city: "",
					address: "",
					email: "",
				},
				error: action.payload,
			};
		case actionTypes.SIGNUP_REQUEST:
			return {
				...state,
				loading: true,
			};
		case actionTypes.SIGNUP_SUCCESS:
			return {
				...state,
				loading: false,
				user: {
					name: "",
					mobile: "",
					gender: "",
					img: "",
					url: "",
					country: "",
					state: "",
					city: "",
					address: "",
					email: "",
				},
				error: "",
			};
		case actionTypes.SIGNUP_FAILED:
			return {
				...state,
				loading: false,
				user: {
					name: "",
					mobile: "",
					gender: "",
					img: "",
					url: "",
					country: "",
					state: "",
					city: "",
					address: "",
					email: "",
				},
				error: action.payload,
			};
			case actionTypes.LOG_OUT:
				return {
					...state,
					loading: false,
					loginSuccess: false,
					loginRequestSuccess:false,
					user: {
						name: "",
						mobile: "",
						gender: "",
						img: "",
						url: "",
						country: "",
						state: "",
						city: "",
						address: "",
						email: "",
					},
					error: '',
				};
		default:
			return state;
	}
};

export default authReducer;
