import React from "react";
// popular restaurant card
const PopularRestaurantCard = () => {
	return (
		<div class="col-xs-12 col-sm-6 col-md-4 food-item">
			<div class="food-item-wrap">
				<div
					class="figure-wrap bg-image"
					data-image-src="http://placehold.it/380x210"
					style={{
						background:
							"url('http://placehold.it/380x210&quot') center center / cover no-repeat",
					}}
				>
					<div class="distance">
						<i class="fa fa-pin"></i>1240m
					</div>
					<div class="rating pull-left">
						
						<i class="fa fa-star"></i> <i class="fa fa-star"></i>{" "}
						<i class="fa fa-star"></i> <i class="fa fa-star"></i>{" "}
						<i class="fa fa-star-o"></i>{" "}
					</div>
					<div class="review pull-right">
						<a href="#">198 reviews</a>{" "}
					</div>
				</div>
				<div class="content">
					<h5>
						<a href="profile.html">
							The South"s Best Fried Chicken
						</a>
					</h5>
					<div class="product-name">Fried Chicken with cheese</div>
					<div class="price-btn-block">
						{" "}
						<span class="price">$ 15,99</span>{" "}
						<a href="#" class="btn theme-btn-dash pull-right">
							Order Now
						</a>{" "}
					</div>
				</div>
				<div class="restaurant-block">
					<div class="left">
						<a class="pull-left" href="profile.html">
							{" "}
							<img
								src="http://placehold.it/50x46"
								alt="Restaurant logo"
							/>{" "}
						</a>
						<div class="pull-left right-text">
							{" "}
							<a href="#">Chicken Restaurant</a>{" "}
							<span>68 5th Avenue New York</span>{" "}
						</div>
					</div>
					<div class="right-like-part pull-right">
						{" "}
						<i class="fa fa-heart-o"></i> <span>48</span>{" "}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PopularRestaurantCard;
