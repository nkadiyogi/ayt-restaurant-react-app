import * as actionsTypes from "./actionTypes";
export const getRestaurants = () => {
	return (dispatch) => {
		fetch("http://www.adiyogitechnosoft.com/restaurant/api/Restaurant",
		{
			method:"GET",
			headers:{
				'Content-Type':'application/json',	
				"Access-Control-Allow-Origin":"*",
				'X-API-KEY':'NODN2D0I7W4V8I2K'
			}
		}
		)
			.then(response =>{ 
				console.log('response',response);
				 return response.json();
				})
			.then(response => console.log('response',response))
			.catch((err) => console.log("err", err));

		
	};
};

export const searchRestaurantRequest = () => {
	return {
		type: actionsTypes.SEARCH_REQUEST,
	};
};
export const searchRestaurantRequestSuccess = (data) => {
	return {
		type: actionsTypes.SEARCH_SUCCESS,
		payload: data,
	};
};
export const searchRestaurantRequestFailed = () => {
	return {
		type: actionsTypes.SEARCH_FAILED,
	};
};

export const updateSecondryLink = (link) => {
	return {
		type: actionsTypes.UpdateSecondryLink,
		payload:link
	};
};
// set restaurant list getting from server
export const setRestaurantList = (list) => {
	return {
		type: actionsTypes.SET_RESTAURANT_LIST,
		payload:list
	};
}
// failed to fetch list 
export const restaurantListFailed = (error) => {
	return {
		type: actionsTypes.RESTAURANT_LIST_REQUEST_FAILED,
		payload:error
	};
}

// restaurant category 

export const setRestaurantCategory = (productCategoryId) => {
	return {
		type: actionsTypes.SET_RESTAURANT_CATEGORY,
		payload: productCategoryId,
	};
};
export const restaurantRequestCategory =()=>{
	return {
		type: actionsTypes.RESTAURANT_CATEGORY_REQUEST,
	}
}
export const restaurantCategoryReq_Success =(data)=>{
	return {
		type: actionsTypes.RESTAURANT_CATEGORY_REQUEST_SUCCESS,
		payload:data
	}
}
export const restaurantCategoryReq_Failed =()=>{
	return {
		type: actionsTypes.RESTAURANT_CATEGORY_REQUEST_FAILED,
	}
}
export const getRestaurantCategory = () => {
	return (dispatch) => {
		dispatch(restaurantRequestCategory());
		fetch(
			`http://www.adiyogitechnosoft.com/restaurant/api/Restaurant_category`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					 Accept: "*/*",
					"X-API-KEY": process.env.REACT_APP_X_API_KEY,
					"Access-Control-Allow-Origin": "*",
				},
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log("response", result);
				if (result.status == false) {
					return dispatch(
						restaurantCategoryReq_Failed(result.msg)
					);
				}
				dispatch(
					dispatch(restaurantCategoryReq_Success(result.data))
				);
			})
			.catch((err) => {
				console.log("err", err);
				restaurantCategoryReq_Failed(err);
			});
	};
};

export const clearRestaurantCategoryFilter = ()=>{
	return {
		type: actionsTypes.CLEAR_RESTAURANT_CATEGORY_FILTER
	}
}

export const setSelectedRestaurantCity = (cityObj)=>{
	return {
		type: actionsTypes.SET_SELECTED_RESTAURANT_CITY,
		payload:cityObj
	}
}