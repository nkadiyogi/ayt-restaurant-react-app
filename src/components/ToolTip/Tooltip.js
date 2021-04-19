import React from "react";
import "./Tooltip.css";
const Tooltip = (props) => {
	return (
		<div className="tooltip">
			Hover over me
			<span className="tooltiptext">Tooltip text</span>
		</div>
	);
};

export default Tooltip;
