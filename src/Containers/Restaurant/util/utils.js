export const checkRestaurantIsOpen = (restaurantOpeningTime, restaurantClosingTime) => {
	// let openingTime = "10:30:00";
	// let closingTime = "11:32:00";
	let openingTime = restaurantOpeningTime.split(":");
	let closingTime = restaurantClosingTime.split(":");
	const startTimeObject = new Date();
	startTimeObject.setHours(openingTime[0], openingTime[1], openingTime[2]);

	const endTimeObject = new Date();
	endTimeObject.setHours(closingTime[0], closingTime[1], closingTime[2]);

	const currentTime = Date.now();
	if (startTimeObject <= currentTime && endTimeObject > currentTime)
		return true;
	else return false;
};
