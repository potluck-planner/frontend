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
import AddFood from "./AddFoodForm";

export class Event extends Component {
	componentDidMount() {
		// const URL = `http://localhost:5000/event/${this.props.event_id}`;
		const URL = `https://potlucker-planner.herokuapp.com/event/${
			this.props.event_id
		}`;
		this.props.getSingleEvent(URL).then(
			// this.props.getUsers(`http://localhost:5000/users/`)
			this.props.getUsers(`https://potlucker-planner.herokuapp.com/users/`)
		);
	}

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
				<div className="eventTop">
					{this.props.user.id === this.props.organizer_id && (
						<div
							onClick={e => {
								e.preventDefault();
								this.props
									.deleteEvent(
										// `http://localhost:5000/event/${this.props.event_id}`
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
						<div className="eventFood">
							<h1>Food List</h1>
							{this.props.singleEvent.food.map(food => (
								<EventFood {...this.props} {...food} key={food.recipe_name} />
							))}
							<AddFood {...this.props} key={this.props.quantity} />
						</div>
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
