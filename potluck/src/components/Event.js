import React, { Component } from "react";
import { getSingleEvent, deleteEvent, updateEvent } from "../actions";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import EventFood from "./Event-Food";
import EventGuests from "./Event-Guests";
import EventInfo from "./Event-Info";
import EventLocation from "./Event-Location";

export class Event extends Component {
	constructor() {
		super();
		this.state = {
			updatingInfo: false,
			updatingLocation: false
		};
	}

	componentDidMount() {
		const URL = `https://potlucker-planner.herokuapp.com/event/${
			this.props.event_id
		}`;
		this.props.getSingleEvent(URL);
	}

	updateInfo = e => {
		e.preventDefault();
		if (this.state.updatingInfo === false) {
			this.setState({
				updatingInfo: true
			});
		} else {
			this.setState({
				updatingInfo: false
			});
		}
	};

	updateLocation = e => {
		e.preventDefault();
		if (this.state.updatingLocation === false) {
			this.setState({
				updatingLocation: true
			});
		} else {
			this.setState({
				updatingLocation: false
			});
		}
	};

	render() {
		console.log(this.props);
		console.log(this.props.match);
		console.log(this.props.singleEvent);
		console.log(this.props.singleEvent.event);
		if (this.props.singleEvent.event === undefined) {
			return (
				<div className="loadingIcon">
					<Loader type="TailSpin" color="#1f2a38" height="100" width="100" />
				</div>
			);
		}

		return (
			<div className="event">
				<div className="cardElement buttonDiv">
					<div onClick={this.updateInfo} className="updateButton">
						<i className="far fa-edit" />
					</div>
					<div
						onClick={e => {
							e.preventDefault();
							this.props.deleteEvent(this.props.event_id);
							// need to hook up user info so pushes to the correct page
							// return this.props.match === undefined
							// 	? null
							// 	: this.props.history.push(`/users/${this.state.user.username}/events`);
						}}
						className="deleteButton"
					>
						<i className="far fa-trash-alt" />
					</div>
				</div>
				<EventInfo {...this.props} />
				<EventLocation {...this.props} />
				<EventGuests {...this.props} />
				<EventFood {...this.props} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	error: state.singleEventReducer.error,
	fetchingSingleEvent: state.singleEventReducer.updatingEvent,
	singleEvent: state.singleEventReducer.singleEvent
});

export default connect(
	mapStateToProps,
	{ getSingleEvent, updateEvent, deleteEvent }
)(Event);
