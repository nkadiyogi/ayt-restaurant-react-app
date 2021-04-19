import React from 'react'

const FeaturedRestaurant =()=> {
    return (
        <section className="featured-restaurants">
        <div className="container">
            <div className="row">
                <div className="col-sm-4">
                    <div className="title-block pull-left">
                        <h4>Featured restaurants</h4> </div>
                </div>
                <div className="col-sm-8">
                    {/* <!-- restaurants filter nav starts --> */}
                    <div className="restaurants-filter pull-right">
                        <nav className="primary pull-left">
                            <ul>
                                <li><a href="#" className="selected" data-filter="*">Grill</a> </li>
                                <li><a href="#" data-filter=".pizza">Pizza</a> </li>
                                <li><a href="#" data-filter=".pasta">Pasta</a> </li>
                                <li><a href="#" data-filter=".thaifood">thai food</a> </li>
                                <li><a href="#" data-filter=".fish">fish</a> </li>
                            </ul>
                        </nav>
                    </div>
                    {/* <!-- restaurants filter nav ends --> */}
                </div>
            </div>
            {/* <!-- restaurants listing starts --> */}
            <div className="row">
                <div className="restaurant-listing" style={{position: 'relative', height: '471px'}}>
                    <div className="col-xs-12 col-sm-12 col-md-6 single-restaurant grill fish thaifood pizza" style={{position: 'absolute', left: '0px',top: '0px'}}>
                        <div className="restaurant-wrap">
                            <div className="row">
                                <div className="col-xs-12 col-sm-3 col-md-12 col-lg-3 text-xs-center">
                                    <a className="restaurant-logo" href="#"> <img src="http://placehold.it/95x95" alt="Restaurant logo"/> </a>
                                </div>
                                {/* <!--end:col --> */}
                                <div className="col-xs-12 col-sm-9 col-md-12 col-lg-9">
                                    <h5><a href="profile.html">Maenaam Thai Restaurant</a></h5> <span>Burgers, American, Sandwiches, Fast Food, BBQ</span>
                                    <div className="bottom-part">
                                        <div className="cost"><i className="fa fa-check"></i> Min $ 10,00</div>
                                        <div className="mins"><i className="fa fa-motorcycle"></i> 30 min</div>
                                        <div className="ratings"> <span>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star-o"></i>
                                            </span> (122) </div>
                                    </div>
                                </div>
                                {/* <!-- end:col --> */}
                            </div>
                            {/* <!-- end:row --> */}
                        </div>
                        {/* <!--end:Restaurant wrap --> */}
                    </div>
                    {/* // <!--end: col --> */}
                    <div className="col-xs-12 col-sm-12 col-md-6 single-restaurant grill fish pasta thaifood" style={{position: 'absolute', left: '634px' ,top:'0px'}}>
                        <div className="restaurant-wrap">
                            <div className="row">
                                <div className="col-xs-12 col-sm-3 col-md-12 col-lg-3 text-xs-center">
                                    <a className="restaurant-logo" href="#"> <img src="http://placehold.it/95x95" alt="Restaurant logo"/> </a>
                                </div>
                                {/* <!--end:col --> */}
                                <div className="col-xs-12 col-sm-9 col-md-12 col-lg-9">
                                    <h5><a href="profile.html">Maenaam Thai Restaurant</a></h5> <span>Burgers, American, Sandwiches, Fast Food, BBQ</span>
                                    <div className="bottom-part">
                                        <div className="cost"><i className="fa fa-check"></i> Min $ 10,00</div>
                                        <div className="mins"><i className="fa fa-motorcycle"></i> 30 min</div>
                                        <div className="ratings"> <span>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </span> (122) </div>
                                    </div>
                                </div>
                                {/* <!-- end:col --> */}
                            </div>
                            {/* <!-- end:row --> */}
                        </div>
                        {/* <!--end:Restaurant wrap --> */}
                    </div>
                    {/* <!--end: col --> */}
                    <div className="col-xs-12 col-sm-12 col-md-6 single-restaurant grill thaifood pasta pizza" style={{position: 'absolute',left: '0px', top:' 157px'}}>
                        <div className="restaurant-wrap">
                            <div className="row">
                                <div className="col-xs-12 col-sm-3 col-md-12 col-lg-3 text-xs-center">
                                    <a className="restaurant-logo" href="#"> <img src="http://placehold.it/95x95" alt="Restaurant logo"/> </a>
                                </div>
                                {/* <!--end:col --> */}
                                <div className="col-xs-12 col-sm-9 col-md-12 col-lg-9">
                                    <h5><a href="profile.html">Maenaam Thai Restaurant</a></h5> <span>Burgers, American, Sandwiches, Fast Food, BBQ</span>
                                    <div className="bottom-part">
                                        <div className="cost"><i className="fa fa-check"></i> Min $ 10,00</div>
                                        <div className="mins"><i className="fa fa-motorcycle"></i> 30 min</div>
                                        <div className="ratings"> <span>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star-o"></i>
                                        <i className="fa fa-star-o"></i>
                                    </span> (122) </div>
                                    </div>
                                </div>
                                {/* <!-- end:col --> */}
                            </div>
                            {/* <!-- end:row --> */}
                        </div>
                        {/* <!--end:Restaurant wrap --> */}
                    </div>
                    {/* <!--end: col --> */}
                    <div className="col-xs-12 col-sm-12 col-md-6 single-restaurant thaifood fish pasta" style={{position: 'absolute',left: '634px', top: '157px'}}>
                        <div className="restaurant-wrap">
                            <div className="row">
                                <div className="col-xs-12 col-sm-3 col-md-12 col-lg-3 text-xs-center">
                                    <a className="restaurant-logo" href="#"> <img src="http://placehold.it/95x95" alt="Restaurant logo"/> </a>
                                </div>
                                {/* <!--end:col --> */}
                                <div className="col-xs-12 col-sm-9 col-md-12 col-lg-9">
                                    <h5><a href="profile.html">Maenaam Thai Restaurant</a></h5> <span>Burgers, American, Sandwiches, Fast Food, BBQ</span>
                                    <div className="bottom-part">
                                        <div className="cost"><i className="fa fa-check"></i> Min $ 10,00</div>
                                        <div className="mins"><i className="fa fa-motorcycle"></i> 30 min</div>
                                        <div className="ratings"> <span>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star-o"></i>
                                    </span> (122) </div>
                                    </div>
                                </div>
                                {/* <!-- end:col --> */}
                            </div>
                            {/* <!-- end:row --> */}
                        </div>
                        {/* <!--end:Restaurant wrap --> */}
                    </div>
                    {/* <!--end: col --> */}
                    <div className="col-xs-12 col-sm-12 col-md-6 single-restaurant grill fish thaifood pasta pizza" style={{position: 'absolute', left: '0px',top: '314px'}}>
                        <div className="restaurant-wrap">
                            <div className="row">
                                <div className="col-xs-12 col-sm-3 col-md-12 col-lg-3 text-xs-center">
                                    <a className="restaurant-logo" href="#"> <img src="http://placehold.it/95x95" alt="Restaurant logo"/> </a>
                                </div>
                                {/* <!--end:col --> */}
                                <div className="col-xs-12 col-sm-9 col-md-12 col-lg-9">
                                    <h5><a href="profile.html">Maenaam Thai Restaurant</a></h5> <span>Burgers, American, Sandwiches, Fast Food, BBQ</span>
                                    <div className="bottom-part">
                                        <div className="cost"><i className="fa fa-check"></i> Min $ 10,00</div>
                                        <div className="mins"><i className="fa fa-motorcycle"></i> 30 min</div>
                                        <div className="ratings"> <span>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star-o"></i>
                                    </span> (122) </div>
                                    </div>
                                </div>
                                {/* <!-- end:col --> */}
                            </div>
                            {/* <!-- end:row --> */}
                        </div>
                        {/* <!--end:Restaurant wrap --> */}
                    </div>
                    {/* // <!--end: col --> */}
                    <div className="col-xs-12 col-sm-12 col-md-6 single-restaurant grill pasta pizza" style={{position: 'absolute', left: '634px', top: '314px'}}>
                        <div className="restaurant-wrap">
                            <div className="row">
                                <div className="col-xs-12 col-sm-3 col-md-12 col-lg-3 text-xs-center">
                                    <a className="restaurant-logo" href="#"> <img src="http://placehold.it/95x95" alt="Restaurant logo"/> </a>
                                </div>
                                {/* <!--end:col --> */}
                                <div className="col-xs-12 col-sm-9 col-md-12 col-lg-9">
                                    <h5><a href="profile.html">Maenaam Thai Restaurant</a></h5> <span>Burgers, American, Sandwiches, Fast Food, BBQ</span>
                                    <div className="bottom-part">
                                        <div className="cost"><i className="fa fa-check"></i> Min $ 10,00</div>
                                        <div className="mins"><i className="fa fa-motorcycle"></i> 30 min</div>
                                        <div className="ratings"> <span>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star-o"></i>
                                    </span> (122) </div>
                                    </div>
                                </div>
                                {/* <!-- end:col --> */}
                            </div>
                            {/* <!-- end:row --> */}
                        </div>
                        {/* <!--end:Restaurant wrap --> */}
                    </div>
                    {/* <!--end: col --> */}
                </div>
            </div>
            {/* <!-- restaurants listing ends -->
            <!-- add restaurant starts --> */}
            <section className="add-restaurants">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-3 add-title">
                            <h4>Add Your Restaurant</h4> </div>
                        <div className="col-xs-12 col-sm-5 join-text">
                            <p>Join the thousands of other restaurants who benefit from having their menus on <a href="#"><strong> FoodPicky directory</strong></a> </p>
                        </div>
                        <div className="col-xs-12 col-sm-4 join-btn text-xs-right"><a href="#" className="btn theme-btn btn-lg">I‘m restaurant</a> </div>
                    </div>
                </div>
            </section>
            {/* <!-- add restaurant ends --> */}
        </div>
    </section>
    )
}

export default FeaturedRestaurant
