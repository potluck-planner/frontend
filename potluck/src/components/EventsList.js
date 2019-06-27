import React from "react";
import EventCard from "./EventCard";
import Loader from "react-loader-spinner";
import { getEvents, deleteEvent, deleteGuest, getUsers } from "../actions";
import { connect } from "react-redux";
// import Moment from "react-moment";

class EventsList extends React.Component {
	componentDidMount() {
		// const URL = `http://localhost:5000/users/${
		// 	this.state.user.username
		// }/events`;
		const URL = `https://potlucker-planner.herokuapp.com/users/${
			this.props.activeUser.username
		}/events`;
		this.props.getEvents(URL).then(
			// this.props.getUsers(`http://localhost:5000/users/`)
			this.props.getUsers(`https://potlucker-planner.herokuapp.com/users/`)
		);
	}

	// deleteGuest is hosted here so that events listing refreshes
	deleteGuest = (e, event_id) => {
		e.preventDefault();
		this.props
			.deleteGuest(
				// `http://localhost:5000/event/${event_id}`
				`https://potlucker-planner.herokuapp.com/event/${event_id}/guests`,
				{
					data: {
						event_id: event_id,
						username: this.props.activeUser.username
					}
				},
				event_id
			)
			.then(() =>
				this.props.getEvents(
					`https://potlucker-planner.herokuapp.com/users/${
						this.props.activeUser.username
					}/events`
				)
			);
	};

	render() {
		console.log(this.props);
		if (this.props.fetchingEvents) {
			return (
				<div className="loadingIcon">
					<Loader type="TailSpin" color="#1f2a38" height="100" width="100" />
				</div>
			);
		} else if (this.props.error) {
			return <h1>Sorry, it's us, not you</h1>;
		}
		return (
			<div className="eventsList">
				<h1>Events Listing</h1>
				<ul>
					{this.props.events
						.sort((a, b) => {
							return (
								new Date(a.date) - new Date(b.date)
								// ||
								// <Moment parse="HH:mm:ss">{a.time}</Moment> -
								// <Moment parse="HH:mm:ss">{b.time}</Moment>
							);
						})
						.map(event => {
							return (
								<EventCard
									{...event}
									{...this.props}
									key={event.event_id}
									deleteEvent={this.props.deleteEvent}
									deleteGuest={this.deleteGuest}
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
	events: state.fetchDataReducer.events,
	allUsers: state.fetchUsers.allUsers
});

export default connect(
	mapStateToProps,
	{ getEvents, deleteEvent, deleteGuest, getUsers }
)(EventsList);
