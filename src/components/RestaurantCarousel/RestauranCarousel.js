import React, { useEffect } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import defaultImg from "../../images/Carasual_img/not-found-image-full-width.jpg";
import { useSelector } from "react-redux";
const baseUrl = process.env.REACT_APP_API_BASE_URL;
const RestauranCarousel = () => {
	const restaurantState = useSelector((state) => state.restaurantReducer);
	const { sliderData } = restaurantState;
	
	useEffect(() => {
		console.log("carouselData ", sliderData);
	}, []);

	// https://picsum.photos/900/300/?random
	const style={
		carousel:{
			maxHeight:'400px'
		}
	}

	const images = sliderData.ImagesData.map((img, index) => {
		const url = `${baseUrl}/${sliderData.path}${img}`
		return <div key={index} style={style.carousel}>
			<img src={url} alt={"img" + index} onError={(e)=>e.target.src=defaultImg }/>
		</div>
	});
	return (
		<div 
		
		>
			<Carousel
				infiniteLoop={true}
				interval={2000}
				autoPlay={true}
				dynamicHeight={false}
				showThumbs={false}
			>
				{images}
			</Carousel>
		</div>
	);
};

export default RestauranCarousel;
