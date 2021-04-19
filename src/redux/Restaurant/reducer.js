import * as actioTypes from "./actionTypes";

const initialState = {
	restaurantProfile: {
		id: "",
		unique_id: "",
		rest_cat_id: "",
		name: "",
		url: "",
		title: "",
		keyword: "",
		phone: "",
		email: "",
		date: "",
		qr_code: "",
		qr_img: "",
		country: "",
		state: "",
		city: "",
		address: "",
		pincode: "",
		description: "",
		img: "",
		logo: "",
		online_booking: "",
		online_table_booking: "",
		take_away: "",
		shipping_charge: "",
		shipping_amt: "",
		shipp_reason: "",
		disc_amt: "",
		disc_reason: "",
		adv_support: "",
		spc_discount: "",
		min_booking: "",
		opentime: '',
		closetime: '',
		status: "",
	},
	products: [],
	productCategory: [],
	selectedProductCategoryId: "",
	loading: false,
	sliderLoader:false,
	restaurantLoader:true,
	productLoader:false,
	error: null,
	resNotFound:false,
	filters: null,
	restaurantIsOpen: false,
	sliderData: {
		id: "4",
		restaurant_id: "NODE2C5N9G8K0V",
		name: "demo4",
		images:
			'a:4:{i:0;s:37:"e27fe35a751476947cc0babbef52f473.jpeg";i:1;s:37:"03498a3b6d605536921092ea812745be.jpeg";i:2;s:37:"46dcd7effabb6a14befd618db1759af0.jpeg";i:3;s:36:"485333631943d0c96ee5d6cffd6f42ac.png";}',
		image_type: 1,
		path: "uploads/restaurant/NODE2C5N9G8K0V/",
		date: "2021-03-22 10:37:26",
		url: "demo4",
		status: "1",
		deleted: "0",
		created_by: "0",
		ImagesData: [],
		imageType: "Slider Images",
	},
};
const restaurantReducer = (state = initialState, action) => {
	switch (action.type) {
		case actioTypes.RESTAURANT_REQUEST:
			return {
				...state,
				restaurantLoader: true,
				error: null,
				resNotFound:false
			};
		case actioTypes.RESTAURANT_SUCCESS:
			return {
				...state,
				restaurantLoader: false,
				error: null,
				resNotFound:false,
				restaurantProfile: action.payload,
			};
		case actioTypes.RESTAURANT_REQUEST_FAILED:
			return {
				...state,
				restaurantLoader: false,
				resNotFound:true,
				restaurantProfile: {
					id: "",
					unique_id: "",
					rest_cat_id: "",
					name: "",
					url: "",
					title: "",
					keyword: "",
					phone: "",
					email: "",
					date: "",
					qr_code: "",
					qr_img: "",
					country: "",
					state: "",
					city: "",
					address: "",
					pincode: "",
					description: "",
					img: "",
					logo: "",
					online_booking: "",
					online_table_booking: "",
					take_away: "",
					shipping_charge: "",
					shipping_amt: "",
					shipp_reason: "",
					disc_amt: "",
					disc_reason: "",
					adv_support: "",
					spc_discount: "",
					min_booking: "",
					opentime: "",
					closetime: "",
					status: "",
				},
				error: action.payload,
			};
		case actioTypes.PRODUCT_REQUEST:
			return {
				...state,
				productLoader: true,
				products: [],
				error: "",
			};
		case actioTypes.PRODUCT_REQUEST_SUCCESS:
			return {
				...state,
				productLoader: false,
				products: action.payload,
				error: "",
			};
		case actioTypes.PRODUCT_REQUEST_FAILED:
			return {
				...state,
				productLoader: false,
				products: [],
				error: action.payload,
			};
		case actioTypes.SET_PRODUCT_CATEGORY:
			return {
				...state,
				selectedProductCategoryId: action.payload,
			};
		case actioTypes.CLEAR_PRODUCT_CATEGORY_FILTER:
			return {
				...state,
				selectedProductCategoryId: "",
			};
		case actioTypes.PRODUCT_CATEGORY_REQUEST:
			return {
				...state,
				loading: true,
			};
		case actioTypes.PRODUCT_CATEGORY_REQUEST_SUCCESS:
			return {
				...state,
				loading: false,
				productCategory: action.payload,
			};
		case actioTypes.PRODUCT_CATEGORY_REQUEST_FAILED:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case actioTypes.CHANGE_RESTAURANT_STATUS:
			return {
				...state,
				restaurantIsOpen: action.payload,
			};
		case actioTypes.SET_SLIDER_DATA:
			return {
				...state,
				sliderData: action.payload,
				sliderLoader:false
			};
		case actioTypes.SLIDER_REQUEST:
			return {
				...state,
				sliderLoader:true
			};
			case actioTypes.SLIDER_REQUEST_FAILED:
				return {
					...state,
					sliderLoader:false,
					error:action.payload
				};
				case actioTypes.SET404FALSE:
					return {
						...state,
						resNotFound:false
					};
		default:
			return state;
	}
};
export default restaurantReducer;
