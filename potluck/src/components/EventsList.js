import React from "react";
import EventCard from "./EventCard";
import Loader from "react-loader-spinner";
import jsonwebtoken from "jsonwebtoken";
import { getEvents, deleteEvent } from "../actions";
import { connect } from "react-redux";

class EventsList extends React.Component {
	constructor() {
		super();
		this.state = {
			user: jsonwebtoken.decode(localStorage.getItem("token"))
				? jsonwebtoken.decode(localStorage.getItem("token"))
				: null
		};
	}

	componentDidMount() {
		const URL = `https://potlucker-planner.herokuapp.com/users/${
			this.state.user.username
		}/events`;
		// const URL = `https://potlucker-planner.herokuapp.com/users/`;
		this.props.getEvents(URL);
	}

	render() {
		console.log(this.props);
		if (this.props.fetchingEvents) {
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
					{this.props.events.map(event => {
						return (
							<EventCard
								{...event}
								{...this.state}
								key={event.event_id}
								deleteEvent={this.props.deleteEvent}
								getEvents={this.props.getEvents}
							/>
						);
					})}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	error: state.fetchDataReducer.error,
	fetchingEvents: state.fetchDataReducer.fetchingEvents,
	events: state.fetchDataReducer.events
});

export default connect(
	mapStateToProps,
	{ getEvents, deleteEvent }
)(EventsList);
