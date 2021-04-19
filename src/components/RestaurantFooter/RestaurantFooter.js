import React from "react";
import noImage from "../../images/not-found-image-15383864787lu.jpg";
import { Link } from "react-router-dom";
const RestaurantFooter = (props) => {
	const { profile, locationHistory, foodProducts } = props;
	const { match } = locationHistory;
	const brandLogo = `http://www.adiyogitechnosoft.com/restaurant/uploads/restaurant/${profile.unique_id}/${profile.logo}`;
	let feturedProducts = [];
	foodProducts.forEach((item) => {
		if (feturedProducts.length == 10) return;
		if (item.special_product == 1) feturedProducts.push(item);
	});
	feturedProducts = feturedProducts.map((item, index) => (
		<li>{item.name}</li>
	));
	const style ={
		ulStyle:{
			listStyleType: 'decimal',
			paddingLeft:'16px'
		}
	}
	console.log("match footer ", match);
	return (
		<footer className="footer">
			<div className="container">
				{/* <!-- top footer statrs --> */}
				<div className="row top-footer">
					<div className="col-xs-12 col-sm-4 footer-logo-block color-gray">
						<Link to={match.url}>
							<img
								src={brandLogo}
								className="img-fluid"
								alt="Footer logo"
							/>
						</Link>
					</div>
					<div className="col-xs-12 col-sm-8">
						<div className="col-xs-12 col-sm-4 color-gray px-0">
							<h5>3 Steps To Order Your Favourite Food</h5>
							<ul style={style.ulStyle}>
								<li>
									<span >
										Goto -> <Link to={match.url+'/order-online'}> Order Online</Link>
									</span>
								</li>
								<li>
									<span>Choose Meal</span>
								</li>
								<li>
									<span>
										Pay Via Credit/Debit Card Or Cash
									</span>
								</li>
								<li>
									<span>Wait For Delivery</span>
								</li>
							</ul>
						</div>
						<div className="col-xs-12 col-sm-4 pages color-gray px-0">
							<h5>Pages</h5>
							<ul>
								<li>
									<Link to={`${match.url}`}>Home Page</Link>
								</li>
								<li>
									<Link to={`${match.url}/signup`}>
										User Sign Up Page
									</Link>
								</li>
								<li>
									<Link to={`${match.url}/about-us`}>
										About Us
									</Link>
								</li>
								<li>
									<Link
										to={`${match.url}/user-account/orders`}
									>
										Orders
									</Link>
								</li>
							</ul>
						</div>
						<div className="col-xs-12 col-sm-4 popular-locations color-gray px-0">
							<h5>Popular Dishes</h5>
							<ul>
								{feturedProducts.length > 0 ? (
									feturedProducts
								) : (
									<li> No Items Here</li>
								)}
							</ul>
						</div>
					</div>
				</div>
				{/* <!-- top footer ends -->
            <!-- bottom footer statrs --> */}
				<div className="bottom-footer">
					<div className="row">
						<div className="col-xs-12 col-sm-4 payment-options color-gray">
							<h5>Payment Options</h5>
							<ul>
								<li>
									<Link to={match.url}>
										<img
											src="../../images/paypal.png"
											alt="Paypal"
										/>
									</Link>
								</li>
								<li>
									<a href="#">
										<img
											src="../../images/mastercard.png"
											alt="Mastercard"
										/>
									</a>
								</li>
								<li>
									<a href="#">
										<img
											src="../../images/maestro.png"
											alt="Maestro"
										/>{" "}
									</a>
								</li>
								<li>
									<a href="#">
										<img
											src="../../images/stripe.png"
											alt="Stripe"
										/>{" "}
									</a>
								</li>
								<li>
									<a href="#">
										<img
											src="../../images/bitcoin.png"
											alt="Bitcoin"
										/>{" "}
									</a>
								</li>
							</ul>
						</div>
						<div className="col-xs-12 col-sm-4 address color-gray">
							<h5>Address :</h5>
							<p>{profile.address}</p>
							<p>
								Concept design of online food order and
								delivery,planned as restaurant directory
							</p>
							<h5>
								Phone:
								<a href={`tel:+${profile.phone}`}>
									{profile.phone}
								</a>
							</h5>
						</div>
						<div className="col-xs-12 col-sm-4 address color-gray">
							<h5>Follow Us On Social Media</h5>
							<a
								href="http://facebook.com"
								target="_blank"
								className="fa fa-2x text-white fa-facebook mr-2"
							></a>
							<a
								href="http://twitter.com"
								target="_blank"
								className="fa fa-2x text-white  fa-twitter"
							></a>
						</div>
					</div>
				</div>
				{/* <!-- bottom footer ends --> */}
			</div>
		</footer>
	);
};

export default RestaurantFooter;
