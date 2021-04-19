import React, { useEffect } from "react";
import "./RestaurantPhotos.css";
import PhotoCard from "./PhotoCard/PhotoCard";
const RestaurantPhotos = (props) => {
	useEffect(() => {
		console.log("component did mount");
	}, []);
	const getRestaurantPhotos = () => {
		fetch("http://www.adiyogitechnosoft.com/restaurant/api/Users/", {
			method: "GET",
			headers: {
				// "X-API-KEY": "NODN2D0I7W4V8I2K",
				"Access-Control-Allow-Origin": "*",
			},
		})
			.then((response) => response.json())
			.then((result) => {
				console.log("photos fetched success", result);
				if (result.status == false) {
				} else {
				}
			})
			.catch((err) => console.log("fetch failed error", err));
	};
	const list = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((p, index) => (
		<PhotoCard key={index} i={index} />
	));
	console.log("[ResPhotos.js]");
	return (
		<div className="container-fluid main-container mt-2 pt-3">
			<div className="d-flex photo-container">{list}</div>
		</div>
	);
};


export default RestaurantPhotos;
