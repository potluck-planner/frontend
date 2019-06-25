import React from "react";
import Event from "./Event";
import Loader from "react-loader-spinner";
import { getEvents } from "../actions";
import { connect } from "react-redux";
import jsonwebtoken from "jsonwebtoken";

class EventLink extends React.Component {
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
				{this.props.events
					.filter(
						event => event.event_id === parseInt(this.props.match.params.id)
					)
					.map(event => (
						<Event {...event} {...this.props} key={event.event_id} />
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
