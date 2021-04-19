const xApiKey = process.env.REACT_APP_X_API_KEY;
const baseUrl = process.env.REACT_APP_API_BASE_URL;
export const getAboutData = (restaurantId) => {
	return fetch(
		`${baseUrl}/api/restaurant_about_us?restaurant_id=${restaurantId}`,
		{
			method: "GET",
			headers: {
				Accept: "*/*",
				"Access-Control-Allow-Origin": "*",
				"X-API-KEY": xApiKey,
			},
		}
	).then((res) => res.json());
};
