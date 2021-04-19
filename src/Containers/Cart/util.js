<div className="row">
<div className="bg-white col-lg-8 col-sm-12 mb-5 p-5 rounded shadow-sm">
    {/* Shopping cart table */}
    <div className="table-responsive">
        <table className="table">
            <thead>
                <tr>
                    <th
                        scope="col"
                        className="border-0 bg-light"
                    >
                        <div className="p-2 px-3 text-uppercase">
                            Product
                        </div>
                    </th>
                    <th
                        scope="col"
                        className="border-0 bg-light"
                    >
                        <div className="py-2 text-uppercase">
                            Price
                        </div>
                    </th>
                    <th
                        scope="col"
                        className="border-0 bg-light"
                    >
                        <div className="py-2 text-uppercase">
                            Quantity
                        </div>
                    </th>
                    <th
                        scope="col"
                        className="border-0 bg-light"
                    >
                        <div className="py-2 text-uppercase">
                            Remove
                        </div>
                    </th>
                    <th
                        scope="col"
                        className="border-0 bg-light"
                    >
                        <div className="py-2 text-uppercase">
                            Total
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>{cartItems}</tbody>
        </table>
    </div>
    {/* End */}
</div>
<div className="col-sm-12 col-lg-4">
    <div className="bg-light rounded-pill px-4 pb-3 text-uppercase font-weight-bold">
        Order summary
    </div>
    <div className="p-4">
        <p className=" mb-4">
            Shipping and additional costs are calculated
            based on values you have entered.
        </p>
        <div className="row m-0">
            <div className="d-flex border-bottom pb-2 justify-content-between">
                <strong className="text-muted">
                    Order Subtotal{" "}
                </strong>
                <strong>${cartState.itemsTotalAmt}</strong>
            </div>
            <div className="d-flex border-bottom pb-2 justify-content-between">
                <strong className="text-muted">
                    Shipping and handling
                </strong>
                <strong>${cartState.shippingAmt}</strong>
            </div>
            <div className="d-flex border-bottom pb-2 justify-content-between">
                <strong className="text-muted">
                    Tax
                </strong>
                <strong>${cartState.taxAmount}</strong>
            </div>
            <div className="d-flex border-bottom pb-2 justify-content-between">
                <strong className="text-muted">
                    Total
                </strong>
                <h5 className="font-weight-bold" >
                    ${cartState.itemsTotalAmt+cartState.shippingAmt + cartState.taxAmount}
                </h5>
            </div>
        </div>
        <button
            onClick={() => {
                // return <Redirect to={`/restaurant/${restaurantProfile.url}/checkout`}/>
                history.push(`/restaurant/${restaurantProfile.url}/checkout`);
            }}
            className="btn btn-block btn-dark btn-success py-2 mb-2 rounded-pill"
            disabled={cartState.cartItems.length < 1}
        >
            Procceed to checkout
        </button>
        {/* <Link
            to={`/restaurant/${restaurantProfile.url}/checkout`}
            className="btn btn-block btn-dark btn-success py-2 mb-2 rounded-pill"
            disabled={cartState.cartItems.length < 1}
        >
            Procceed to checkout
        </Link> */}
    </div>
</div>
</div>


// tr
<tr>
			<td scope="row" className="border-0">
				<div className="p-1">
					{/* <img
						src={`http://www.adiyogitechnosoft.com/restaurant/${props.itemData.item.image_path}/${props.itemData.item.img}`}
						alt
						width={70}
						className="img-fluid rounded shadow-sm"
					/> */}
					<div className="d-inline-block">
						<p className="mb-0 align-middle">
							{props.itemData.item.name}
						</p>
						{/* <span className="text-muted font-weight-normal font-italic d-block">
							Category: {props.itemData.item.cat_name}
						</span> */}
					</div>
				</div>
			</td>
			<td className="border-0 align-middle">
				<p>${props.itemData.item.price}</p>
			</td>
			<td className="border-0 align-middle">
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<button
						className="btn btn-sm btn-ouline-info"
						disabled={props.itemData.quantity < 1}
						onClick={() =>
							dispatch(
								decreaseItemQuantity(props.itemData.item.id)
							)
						}
					>
						-
					</button>
					<p className="px-1 mb-0">{props.itemData.quantity}</p>
					<button
						className="btn btn-sm btn-ouline-info"
						disabled={
							!(
								props.itemData.quantity <
								props.itemData.item.quantity
							)
						}
						onClick={() =>
							dispatch(
								increaseItemQuantity(props.itemData.item.id)
							)
						}
					>
						+
					</button>
				</div>
			</td>
			<td className="border-0 align-middle">
				<span
					role="button"
					href="#"
					className="text-danger"
					onClick={() => dispatch(removeItem(props.itemData.item.id))}
				>
					<i className="fa fa-trash" />
				</span>
			</td>
			<td className="border-0 align-middle">
				<p>
					$
					{Number(props.itemData.quantity) *
						parseFloat(props.itemData.item.price)}
				</p>
			</td>
		</tr>