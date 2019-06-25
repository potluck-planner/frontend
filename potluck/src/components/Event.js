import React, { Component } from "react";
import EventRender from "./EventRender";
import { deleteEvent, updateEvent } from "../actions";
import { connect } from "react-redux";

export class Event extends Component {
	constructor() {
		super();
		this.state = {
			updating: false
		};
	}

	updateState = e => {
		if (this.state.updating === false) {
			this.setState({
				updating: true
			});
		} else {
			this.setState({
				updating: false
			});
		}
	};

	render() {
		console.log(this.props);
		console.log(this.props.match);
		return (
			<div className="event">
				<div className="cardElement buttonDiv">
					<div onClick={this.updateState} className="updateButton">
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
				{/* <EventRender
					{...this.props}
					{...this.state}
					updateEvent={this.props.updateEvent}
					updateState={this.updateState}
				/> */}
				Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder
			</div>
		);
	}
}

const mapStateToProps = state => ({
	error: state.fetchDataReducer.error,
	updatingEvent: state.fetchDataReducer.updatingEvent
});

export default connect(
	mapStateToProps,
	{ updateEvent, deleteEvent }
)(Event);
