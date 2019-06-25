import React from "react";

const EventFood = props => {
	return (
		<div className="eventGuests eventElement">
			<ul>
				{props.singleEvent.guests.map(guest => (
					<li>{guest.username}</li>
				))}
			</ul>
		</div>
	);
};

export default EventFood;
