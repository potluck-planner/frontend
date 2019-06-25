import React from "react";

const EventLocation = props => {
	return (
		<div className="eventLocation eventElement">
			{/* location might need [0] in front if Erik keeps as array */}
			<ul>
				<li>{props.singleEvent.location.address}</li>
				<li>{props.singleEvent.location.city}</li>
				<li>{props.singleEvent.location.state}</li>
			</ul>
		</div>
	);
};

export default EventLocation;
