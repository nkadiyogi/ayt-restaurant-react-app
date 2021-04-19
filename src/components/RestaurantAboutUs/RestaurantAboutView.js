import React, { useEffect } from "react";
import "./RestaurantAboutView.css";
import aboutImg from "../../images/restaurantAboutUs/avel-chuklanov-GATa5sYSf4U-unsplash.jpg";
import aboutImg1 from "../../images/restaurantAboutUs/about.png";
import salad from "../../images/restaurantAboutUs/salad.png";
import hamburger from "../../images/restaurantAboutUs/hamburger.png";
import pancake from "../../images/restaurantAboutUs/pancake.png";
import rib from "../../images/restaurantAboutUs/rib.png";
import defaultImg from '../../images/auth/not-found-image-15383864787lu.jpg';
const basUrl = process.env.REACT_APP_API_BASE_URL;
const RestaurantAboutView = (props) => {
	const {name,title,keyword,heading,description,image_path,img,contents} = props.aboutUsData;
    console.log('about props ',props);
    const aboutBanner  = `${basUrl}/${image_path}${img}`;
    console.log('aboutBanner ',aboutBanner)
	return (
		<div className="popular pt-0">
			<div
				class="inner-page-hero bg-image"
				// data-image-src="http://placehold.it/1670x480"
				data-image-src={aboutBanner}
				style={{
					// url("http://placehold.it/1670x480") center center / cover no-repeat,
					background:`url(${aboutBanner}),url(${defaultImg}) center center / cover no-repeat`,
				}}
			>
				<div class="container">
					<h1 className="text-white">{name}</h1>
					<p className="text-white lead">
					{title}
					</p>
				</div>
				{/* <!-- end:Container --> */}
			</div>

			<div className="container mt-2 ">
				<section class="add-restaurants px-3 pb-3 pt-3 text-center text-wrap">
					<h1 className="mb-3 h1">{heading}</h1>
					<h5 className="">
						{description}
					</h5>
					<p className="sm mt-3">
						{contents}
					</p>
				</section>
				<div className="row align-items-center product-made">
					<div className="col-12 col-sm-6 col-lg-3">
						<div className="single-cool-fact">
							<img src={salad} alt="salad" />
							<h3>
								<span className="counter">1287</span>
							</h3>
							<h6>Amazing receipies</h6>
						</div>
					</div>
					<div className="col-12 col-sm-6 col-lg-3">
						<div className="single-cool-fact">
							<img src={hamburger} alt="hamburger" />
							<h3>
								<span className="counter">25</span>
							</h3>
							<h6>Burger receipies</h6>
						</div>
					</div>
					<div className="col-12 col-sm-6 col-lg-3">
						<div className="single-cool-fact">
							<img src={rib} alt="rib" />
							<h3>
								<span className="counter">471</span>
							</h3>
							<h6>Meat receipies</h6>
						</div>
					</div>
					<div className="col-12 col-sm-6 col-lg-3">
						<div className="single-cool-fact">
							<img src={pancake} alt="pancake" />
							<h3>
								<span className="counter">326</span>
							</h3>
							<h6>Desert receipies</h6>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default RestaurantAboutView;
