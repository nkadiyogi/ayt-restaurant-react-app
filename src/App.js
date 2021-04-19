import React, { useEffect } from "react";
import "./App.css";
import MainLayout from "./Containers/Layout/MainLayout";
// import './css/animate.css'
import './css/animate.min.css'
import './css/animsition.min.css'
import './css/bootstrap.min.css';
import './css/style.css';

const App = () => {
	// const dispatch = useDispatch();
	// useEffect(() => {
	// 	if (window && window.localStorage) {
	// 		const userData = JSON.parse(localStorage.getItem("auth"));
	// 		if (userData) {
	// 			dispatch(loginOtpVeifiSuccess(userData));
	// 			dispatch(setLogin(userData));
	// 		}
	// 	}
	// }, []);
	
	return (
		<div>
		
			<MainLayout />
		</div>
	);
};

export default App;
