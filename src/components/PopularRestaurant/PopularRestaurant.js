import React from "react";
import PopularRestaurantCard from '../PopularRestaurantsCard/RestaurantCard';


const PopularRestaurant = () => {
    const popularRestaurant = [1,2,3,4,5];
    
	return (
		<section class="popular">
			<div class="container">
				<div class="title text-xs-center m-b-30">
					<h2>Popular This Month In Your City</h2>
					<p class="lead">The easiest way to your favourite food</p>
				</div>
				<div class="row">
                    {popularRestaurant.map((restaurant,index)=>  <PopularRestaurantCard key={index}/>)}
                
                </div>
			</div>
		</section>
	);
};

export default PopularRestaurant;
