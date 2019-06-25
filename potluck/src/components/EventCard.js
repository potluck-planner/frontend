import React from "react";
import { Link } from "react-router-dom";

const EventCard = props => {
	console.log(props);
	return (
		<div className="event">
			<Link to={`/event/${props.event_id}`} className="viewDiv">
				View Event
			</Link>
			{/* need functionality here to confirm or delete/decline event */}
			<div>
				<p>Event Name: {props.event_name}</p>
				<p>Organizer: {props.username}</p>
				<p>Date: {props.date}</p>
			</div>
		</div>
	);
};

export default EventCard;
