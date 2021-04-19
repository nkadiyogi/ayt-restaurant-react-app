import React from "react";
import './PhotoCard.css';
import defaultImg from  '../../../images/image-not-found1.png';

const PhotoCard = (props) => {
	const onDefaultImg = (e)=> e.target.src = defaultImg;
	return (
		<div className="bke1zw-1 fJrjep">
			<div
				height="12rem"
			
				className="s1isp7-1 gOXjOA sc-bPzAnn hSYRTq"
			>
				<div src className="s1isp7-3 dqsEmh" />
				<img
					alt="food Image"
					onError={onDefaultImg}
					src={`https://picsum.photos/400/40${props.i}/?random`}
					loading="lazy"
					className="s1isp7-5 khyrTc"
				/>
			</div>
		</div>
	);
};

export default PhotoCard;
