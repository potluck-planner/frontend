import React from "react";
import { Link } from "react-router-dom";

const EventCard = props => {
	console.log(props);

	return (
		<div className="eventCard">
			<div className="cardTop">
				<Link to={`/event/${props.event_id}`} className="viewDiv">
					View Event
				</Link>
				{/* need connect/functionality here to confirm and delete/decline event */}
				<div className="buttonDiv">
					<div
						// onClick should have hover with text saying confirm
						// onClick should only appear if guest has not already confirmed
						/*onClick={props.confirmEvent}*/
						className="updateButton"
					>
						<i className="fas fa-check" />
					</div>
					<div
						// onClick should have hover with text saying decline
						// for organizers it could say delete
						/*onClick={e => props.deleteEvent(e, this.props.id)}*/
						className="deleteButton"
					>
						<i className="far fa-trash-alt" />
					</div>
				</div>
			</div>

			<div>
				<p>Event Name: {props.event_name}</p>
				<p>Organizer: {props.username}</p>
				<p>Date: {props.date}</p>
				<p>{props.going === null ? "Please Confirm" : "You Are Confirmed!"}</p>
			</div>
		</div>
	);
};

export default EventCard;
