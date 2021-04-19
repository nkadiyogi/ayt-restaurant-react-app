import React from "react";
import "./MenuCard.css";
const MenuCard = (props) => {
    const {category} = props;
	const style = {
		mainContainer: {
			padding: "15px",
			width: "310px",
			border: "1px solid #d0cdcd",
			margin: "4px",
            borderRadius: '3px'
		},
		menuCard: {
			// width: "288px",
			// 
		},
		image: {
			width: "100%",
			borderRadius: "7px",
			height: "234px",
		},
	};

	return (
		<div style={style.mainContainer}>
			<div className="menu-card" style={style.menuCard}>
				<img
					src={`https://picsum.photos/600/70${props.i%10}/?random`}
					style={style.image}
					alt="menu card"
					height=""
				/>
				<div className="text-block">
					<h4>{category.name}</h4>
					<p>{category.title}</p>
				</div>
			</div>
			<div className="card-description">
				<p className="mb-0">
					{category.description}
				</p>
			</div>
		</div>
	);
};

export default MenuCard;
