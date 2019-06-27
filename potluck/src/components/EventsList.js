import React from "react";
import EventCard from "./EventCard";
import Loader from "react-loader-spinner";
import { getEvents, deleteEvent, getUsers } from "../actions";
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
	{ getEvents, deleteEvent, getUsers }
)(EventsList);
