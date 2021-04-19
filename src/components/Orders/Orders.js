import React, { useEffect, useState } from "react";
import { getClientOrders } from "../../redux/Orders/action";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../AlertNotification/util";
import ModalView from "../Modal/ModalView";
import Moment from "moment";
import "./Orders.css";
import { xApiKey } from "../../envVariables";
import Spinner from "../Spinner/Spinner";
import Pdf from "react-to-pdf";

const Orders = () => {
	const dispatch = useDispatch();
	const orderState = useSelector((state) => state.ordersReducer);
	const authState = useSelector((state) => state.authReducer);
	const { restaurantProfile } = useSelector(
		(state) => state.restaurantReducer
	);
	const [orderDetails, setOrderDetails] = useState({ order: {}, items: [] });
	const [viewModal, setViewModal] = useState(false);
	const [loadingSpinner, setLoading] = useState(false);

	useEffect(() => {
		dispatch(getClientOrders(authState.user.id));
	}, []);
	const { user } = authState;
	const { error, loading, orders } = orderState;
	const onViewOrder = (order) => {
		setLoading(true);
		setViewModal(true);
		// get order summary
		const config = {
			method: "GET",
			headers: {
				Accept: "*/*",
				"Access-Control-Allow-Origin": "*",
				"X-API-KEY": xApiKey,
			},
		};
		fetch(
			`http://www.adiyogitechnosoft.com/restaurant/api/orderdetail?order_id=${order.order_id}`,
			{
				...config,
			}
		)
			.then((res) => res.json())
			.then((result) => {
				setLoading(false);
				if (result.status == false) {
					console.log("error", result);
					return notify("getting error !! " + result.msg, "warn");
				}
				setOrderDetails({ ...order, items: result.data });
				console.log("result", result);
				// notify("profile updated !!", "success");
			})
			.catch((err) => {
				setLoading(false);
				console.log("err", err);
				notify("getting error !! " + err.messege, "warn");
			});
	};

	const style = {
		ordersHeading: {
			backgroundColor: "#f3f3f3",
			padding: "9px 0px 9px 9px",
		},
		tableFooter: {
			borderBottom: "1px solid #e0e0e0",
		},
	};

	const orderList =
		orderState &&
		orderState.orders.map((order, index) => (
			<div className="row m-0" style={{ padding: "5px 0px" }}>
				<div className="col-xs-1 text-center">{index + 1}</div>
				<div className="col-xs-3 text-center text-truncate">
					{order.order_id}
				</div>
				<div className="col-xs-2 text-center">
					<span>&#8377;</span>
					{order.net_amt}
				</div>
				<div className="col-xs-4 text-center">
					{/* {Moment(order.order_date).format('DD-MM-YYYY')} */}
					{order.order_date.split(" ")[0]}
				</div>
				<div className="col-xs-2 text-center">
					<i
						class="fa fa-eye fa-lg"
						role="button"
						onClick={() => {
							onViewOrder(order);
						}}
					></i>
				</div>
			</div>
		));
	// order items
	const orderItems =
		orderDetails.items &&
		orderDetails.items.map((item, index) => (
			<tr className="item" key={index}>
				<td>
					<span>{item.productName}</span> ({item.qty})
				</td>
				<td>
					<span className="rupee-symbol">&#8377;</span>
					{item.price}
				</td>
			</tr>
		));
	const logoUrl = `http://www.adiyogitechnosoft.com/restaurant/uploads/restaurant/${restaurantProfile.unique_id}/${restaurantProfile.logo}`;
	console.log("orderDetails", orderDetails);

	const pdfRef = React.createRef();
	return (
		<div className="">
			<h3 style={style.ordersHeading} className="">
				Orders {loading ? <Spinner /> : null}
			</h3>
			<div>
				<div
					className="row bg-faded m-0"
					style={{ padding: "6px 0px" }}
				>
					<div className="col-xs-1 text-center">SR</div>
					<div className="col-xs-3 text-center">Order id</div>
					<div className="col-xs-2 text-center">Amount</div>
					<div className="col-xs-4 text-center">Date</div>
					<div className="col-xs-2 text-center">Actions</div>
				</div>
				{orderList.length > 0 ? (
					orderList
				) : (
					<p className="mt-2 text-center">No Orders found !!</p>
				)}
			</div>
			{viewModal && (
				<ModalView show={viewModal} setShowModal={setViewModal}>
					<div className="text-center">
						<div className="print-btn px-1">
						
							<Pdf
								targetRef={pdfRef}
								filename={`${
									orderDetails.order_id
								}_${new Date().toLocaleString()}.pdf`}
							>
								{({ toPdf }) => (
									<button
										className="btn btn-primary btn-sm"
										onClick={toPdf}
									>
										Download
									</button>
								)}
							</Pdf>
						</div>
						<div ref={pdfRef} className="invoice-box">
							{loadingSpinner ? (
								<p className="align-items-center d-flex justify-content-center mb-0">
									<Spinner />
									Loading ...
								</p>
							) : (
								<table cellPadding={0} cellSpacing={0}>
									<tbody>
										<tr className="top">
											<td colSpan={2}>
												<table>
													<tbody>
														<tr>
															<td>
																Invoice #:
																{
																	orderDetails.order_id
																}
																<br />
																Created:
																{
																	orderDetails.order_date
																}
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
										<tr className="information">
											<td colSpan={2}>
												<table>
													<tbody>
														<tr>
															<td>
																{
																	restaurantProfile.address
																}
															</td>
															<td>
																{user.firstname}
																{user.lastname}
																<br />
																{user.email}
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
										<tr className="heading">
											<td>Payment Method</td>
											<td></td>
										</tr>
										<tr>
											<td>Cash</td>
											<td>
												<span className="rupee-symbol">
													&#8377;
												</span>
												{orderDetails.net_amt}
											</td>
										</tr>
										<tr className="heading">
											<td>Item</td>
											<td>Price</td>
										</tr>
										{orderItems}
										<tr className="total">
											<td>Total:</td>
											<td>
												<span className="rupee-symbol">
													&#8377;
												</span>
												{orderDetails.net_amt}
											</td>
										</tr>
									</tbody>
								</table>
							)}
						</div>
					</div>
				</ModalView>
			)}
		</div>
	);
};

export default Orders;
