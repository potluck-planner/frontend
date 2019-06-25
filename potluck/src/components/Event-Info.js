import React from "react";

const EventInfo = props => {
	console.log(props);
	return (
		<div className="eventInfo eventElement">
			<ul>
				<li>Event Name: {props.singleEvent.event.event_name}</li>
				{/* Need to bring in organizer/host name */}
				{/* <li>Organizer: {this.props.singleEvent.event.organizer}</li> */}
				<li>Date: {props.singleEvent.event.date}</li>
				<li>Time: {props.singleEvent.event.time}</li>
				<li>Description: {props.singleEvent.event.description}</li>
			</ul>
		</div>
	);
};

export default EventInfo;
