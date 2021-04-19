import React, { useState } from "react";
import "./ModalView.css";
const ModalView = (props) => {
    
	const style = {
		display: `${props.show ? "block" : "none"}`,
	};
    console.log('props [modal.js]',props);
	return (
		<div
			class="modal-view"
			style={style}
			// onClick={() => props.setShowModal(false)}
		>
			{/* <!-- Modal content --> */}
			<div class="modal-view-content">
				<span class="close" onClick={() => props.setShowModal(false)}>
					&times;
				</span>
				{props.children}
			</div>
		</div>
	);
};

export default ModalView;
