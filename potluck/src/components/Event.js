import React, { Component } from "react";
import {
	getSingleEvent,
	deleteEvent,
	addGuest,
	deleteGuest,
	getUsers
} from "../actions";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import EventFood from "./Event-Food";
import EventGuests from "./Event-Guests";
import EventInfo from "./Event-Info";
import EventLocation from "./Event-Location";

export class Event extends Component {
	componentDidMount() {
		const URL = `https://potlucker-planner.herokuapp.com/event/${
			this.props.event_id
		}`;
		this.props
			.getSingleEvent(URL)
			.then(
				this.props.getUsers(`https://potlucker-planner.herokuapp.com/users/`)
			);
	}

	render() {
		console.log(this.props);
		console.log(this.props.singleEvent);
		// loading animation
		if (this.props.singleEvent.event === undefined) {
			return (
				<div className="loadingIcon">
					<Loader type="TailSpin" color="#1f2a38" height="100" width="100" />
				</div>
			);
		}

		return (
			<div className="event">
				<div className="eventTop">
					{/* only hosts have the ability to see the delete event button */}
					{this.props.activeUser.id === this.props.organizer_id && (
						<div
							onClick={e => {
								e.preventDefault();
								this.props
									.deleteEvent(
										`https://potlucker-planner.herokuapp.com/event/${
											this.props.event_id
										}`
									)
									.then(() => this.props.history.push(`/`));
							}}
							className="deleteButton"
						>
							<i className="far fa-trash-alt" />
						</div>
					)}
				</div>
				<div className="eventBottom">
					<div className="eventLeft">
						<EventInfo
							{...this.props}
							getSingleEvent={this.props.getSingleEvent}
						/>
						<EventLocation
							{...this.props}
							getSingleEvent={this.props.getSingleEvent}
						/>
					</div>
					<div className="eventRight">
						<EventGuests
							{...this.props}
							addGuest={this.props.addGuest}
							deleteGuest={this.props.deleteGuest}
						/>
						<EventFood {...this.props} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	error: state.singleEventReducer.error,
	fetchingSingleEvent: state.singleEventReducer.updatingEvent,
	singleEvent: state.singleEventReducer.singleEvent,
	allUsers: state.fetchUsers.allUsers
});

export default connect(
	mapStateToProps,
	{ getSingleEvent, deleteEvent, addGuest, deleteGuest, getUsers }
)(Event);
