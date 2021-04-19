import { combineReducers } from "redux";
	
import authReducer from "./auth/authReducer";
import restaurantsReducer from "./Restaurants/reducer";
import restaurantReducer from "./Restaurant/reducer";
import cartReducer from './Cart/reducer';
import appReducer from './app/reducer';
import ordersReducer from './Orders/reducer';
import userReducer from './user/reducer';

const rootReducer = combineReducers({
	
	authReducer,
	restaurantsReducer,
	restaurantReducer,
	cartReducer,
	appReducer,
	ordersReducer,
	userReducer
});
export default rootReducer;
