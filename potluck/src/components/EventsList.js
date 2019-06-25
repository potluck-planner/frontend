import React from "react";
import EventCard from "./EventCard";
import Loader from "react-loader-spinner";

const EventsList = props => {
	console.log(props);
	if (props.fetchingEvents) {
		return (
			<div className="loadingIcon">
				<Loader type="TailSpin" color="#1f2a38" height="100" width="100" />
			</div>
		);
	}

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
