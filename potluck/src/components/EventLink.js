import React from "react";
import Event from "./Event";
import Loader from "react-loader-spinner";

const EventLink = props => {
	console.log(props);
	if (props.fetchingEvents) {
		return (
			<div className="loadingIcon">
				<Loader type="TailSpin" color="#1f2a38" height="100" width="100" />
			</div>
		);
	}

	return (
		<div className="Event">
			{props.events
				.filter(event => event.event_id === parseInt(props.match.params.id))
				.map(event => (
					<Event {...event} {...props} key={event.event_id} />
				))}
		</div>
	);
};

export default EventLink;
