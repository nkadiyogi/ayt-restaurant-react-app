import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
const Notification = (props) => {
	const [show, setShow] = useState(true);
	console.log(props);
	return (
		<div class={`alert my-2 alert-${props.type}`} role="alert">
			 {props.messege}
            <span role="button" className="pull-right" onClick={props.closeAlert ? props.closeAlert:null}>x</span>
		</div>
	);
};
export default Notification;
