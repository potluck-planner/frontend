import React from "react";
import Event from "./Event";
import Loader from "react-loader-spinner";
import { getEvents } from "../actions";
import { connect } from "react-redux";

class EventLink extends React.Component {
	componentDidMount() {
		const URL = `https://potlucker-planner.herokuapp.com/users/${
			this.props.activeUser.username
		}/events`;
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
			<div className="Event">
				{/* target single event from events array with filter */}
				{this.props.events
					.filter(
						event => event.event_id === parseInt(this.props.match.params.id)
					)
					.map(event => (
						<Event
							{...event}
							{...this.state}
							{...this.props}
							key={event.event_id}
						/>
					))}
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
	{ getEvents }
)(EventLink);
