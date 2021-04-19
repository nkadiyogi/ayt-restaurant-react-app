import * as actionTypes from "./actionTypes";
const intialStateObj = {
	restaurantId: "",
	cartItems: [],
	itemsTotalAmt: 0.0,
	shippingAmt: 0.0,
	taxRate: 0,
	taxAmount: 0.0,
	grandTotal: 0.0,
	// checkoutProducts will fill when user click to checkout
	checkoutProducts: {
		restaurantId: "",
		order: [],
	},
	// when table booking
	orderModes: [
		{ name: "Delivery", id: actionTypes.ORDER_MODE_ID_DELIVERY },
		{ name: "Takeaway", id: actionTypes.ORDER_MODE_ID_TAKEWAY },
		{ name: "Table Booking", id: actionTypes.ORDER_MODE_ID_BOOK_TABLE},
	],
	// initial table data when user open qr code url
	// fetch table data from api and set to it
	table: {
		tableData: {
			tableNo: "12",
		},
		error: false,
		loading: false,
	},
	loading: false,
	error: null,
	paymentMode: 0,
	orderMode: null,
	paymentSuccess: false,
};
const initialState = { ...intialStateObj };
const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.Add_TO_CART:
			let item = [{ item: { ...action.payload }, quantity: 1 }];
			state.itemsTotalAmt += action.payload.price;
			//
			state.cartItems = [...state.cartItems, ...item];
			state.itemsTotalAmt = calculateItemAmount(state);
			return {
				...state,
				loading: false,
				error: null,
			};
		case actionTypes.INCREASE_QUANTITY:
			// find cart item ,increase quantity and update state
			state.cartItems.forEach((cartItem) => {
				if (cartItem.item.id == action.payload) {
					// if (cartItem.quantity < cartItem.item.quantity) {
					cartItem.quantity++;
					state.itemsTotalAmt = calculateItemAmount(state);
					// }
					return;
				}
			});
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case actionTypes.DECREASE_QUANTITY:
			// find cart item ,decrease quantity and update state
			// quantity is 1 and request for decrese ,then remove that item from cart
			state.cartItems.forEach((cartItem) => {
				if (cartItem.item.id == action.payload) {
					if (cartItem.quantity == 1) {
						// remove item from cart and update new list
						// pass item id and cart items obj ,return new list excludes item
						state.cartItems = removeFromCart(
							action.payload,
							state.cartItems
						);
						return;
					} else {
						decreaseQuantity(action.payload, state.cartItems);
					}
					return;
				}
			});
			state.itemsTotalAmt = calculateItemAmount(state);
			return {
				...state,
			};

		case actionTypes.REMOVE_ITEM:
			// find cart item ,remove and update state
			// @args itemId,cartList
			state.cartItems = removeFromCart(action.payload, state.cartItems);
			state.itemsTotalAmt = calculateItemAmount(state);
			return {
				...state,
			};
		case actionTypes.CHECKOUT:
			// add products and restaurant detail to checkout object
			state.checkoutProducts = {
				restaurantId: state.restaurantId,
				order: [],
			};
			state.cartItems.forEach((orderItem) => {
				state.checkoutProducts.order.push({
					id: orderItem.item.id,
					qty: orderItem.quantity,
					price: orderItem.item.price,
					subtotal: orderItem.quantity * orderItem.item.price,
				});
			});
			state.itemsTotalAmt = calculateItemAmount(state);
			state.taxAmount =
				((state.itemsTotalAmt + state.shippingAmt) * state.taxRate) /
				100;
			state.grandTotal =
				state.itemsTotalAmt + state.shippingAmt + state.taxAmount;
			state.checkoutProducts.restaurantId = state.restaurantId;
			return {
				...state,
			};
		case actionTypes.SET_RETAURANT_ID:
			// check if we open same restaurant again
			if (action.payload == state.restaurantId) return state;

			return {
				...intialStateObj,
				restaurantId: action.payload,
			};
		case actionTypes.CLEAR_CART:
			return {...intialStateObj};
		case actionTypes.SET_ORDER_MODE:
			return {
				...state,
				orderMode: action.payload,
			};
		//table booking is true or false
		case actionTypes.TABLE_DATA_REQUEST:
			return {
				...state,
				table: {
					...initialState.table,
				},
			};
		case actionTypes.TABLE_DATA_REQUEST_SUCCESS:
			return {
				...state,
				table: {
					...state.table,
					tableData: action.payload,
					loading: false,
				},
			};
		case actionTypes.TABLE_DATA_REQUEST_FAILED:
			return {
				...state,
				table: {
					...initialState.table,
					error:action.payload
				},
			};
		case actionTypes.RESET_TABLE_DATA:return {
				...state,
				table: {
					...initialState.table
				},
				orderMode:null
			}
		default:
			return state;
	}
};
//  remove item from cart list return new list
const removeFromCart = (itemId, cartItemList) => {
	return cartItemList.filter((cartItem) => cartItem.item.id != itemId);
};
const decreaseQuantity = (itemId, cartItemList) => {
	cartItemList.forEach((cartItem) => {
		if (cartItem.item.id == itemId) {
			if (cartItem.quantity > 1) {
				cartItem.quantity--;
			}
			return;
		}
	});
};

// calculate total item amount
const calculateItemAmount = (state) => {
	let total = 0;
	state.cartItems.forEach(
		(itemData) => (total += itemData.item.price * itemData.quantity)
	);
	return total;
};
export default cartReducer;
