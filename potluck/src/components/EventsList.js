import React from "react";
import EventCard from "./EventCard";

const EventsList = props => {
	console.log(props);
	return (
		<div className="eventsList">
			<h1>Events Listing</h1>
			<ul>
				{props.events.map(event => {
					return <EventCard {...event} key={event.event_id} />;
				})}
			</ul>
		</div>
	);
};

export default EventsList;
