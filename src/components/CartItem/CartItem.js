import React from "react";
import { useDispatch } from "react-redux";
import {
	decreaseItemQuantity,
	increaseItemQuantity,
	removeItem,
} from "../../redux/Cart/action";
import defaultImg from "../../images/image-not-found1.png";
import "./CartItem.css";
const CartItem = (props) => {
	const dispatch = useDispatch();
	console.log("props [CartItem.js]", props);
	const onDefaultImg = (e) => (e.target.src = defaultImg);
	const style = {
		itemRow: {
			border: "1px solid lightgray",
			padding: "6px",
			marginBottom: "10px",
			borderRadius: "3px",
		},
		lineHeight: {
			lineHeight: "100px",
		},
		productImg: {
			height: "80px",
			width: "80px",
		},
	};
	return (
		<div className="align-items-center row mx-0" style={style.itemRow}>
			<div className="col-xs-3 px-0">
				<img
					src={`http://www.adiyogitechnosoft.com/restaurant/${props.itemData.item.image_path}/${props.itemData.item.img}`}
					alt="product pic here"
					onError={(e) => onDefaultImg(e)}
					className="img-thumbnail rounded shadow-sm product-img"
				/>
			</div>

			<div className="col-xs-9 d-flex justify-content-between align-items-center cart-item-controls ">
				<div className="row w-100 cart-controls">
					<div className="col-xs-12 col-md-6 align-items-center d-flex justify-content-between mb-1">
						
							<span className="align-middle">
								{props.itemData.item.name}
							</span>
							<span className="align-middle rupee-symbol">
							<span className="rupee-symbol">&#8377;</span>{props.itemData.item.price}
							</span>
						
					</div>
					
					<div className="align-items-center col-md-6 col-xs-12 d-flex justify-content-between">
						<div
							style={{
								display: "flex",
								justifyContent: "start",
							}}
						>
							<button
								className="btn btn-sm btn-outline-info"
								disabled={props.itemData.quantity < 1}
								onClick={() =>
									dispatch(
										decreaseItemQuantity(
											props.itemData.item.id
										)
									)
								}
							>
								-
							</button>
							<p className="px-1 mb-0">
								{props.itemData.quantity}
							</p>
							<button
								className="btn btn-sm btn-outline-info"
								// disabled={
								// 	!(
								// 		props.itemData.quantity <
								// 		props.itemData.item.quantity
								// 	)
								// }
								onClick={() =>
									dispatch(
										increaseItemQuantity(
											props.itemData.item.id
										)
									)
								}
							>
								+
							</button>
						</div>

						<span
							role="button"
							className="text-danger"
							onClick={() =>
								dispatch(removeItem(props.itemData.item.id))
							}
						>
							<i className="fa fa-lg fa-trash" />
						</span>
						<span className="align-middle">
							<span className="rupee-symbol">&#8377;</span>
							{Number(props.itemData.quantity) *
								parseFloat(props.itemData.item.price)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
