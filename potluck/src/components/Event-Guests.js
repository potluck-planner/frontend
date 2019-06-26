import React from "react";
import jsonwebtoken from "jsonwebtoken";
import { axiosWithAuth } from "../util/axiosWithAuth";

class EventGuests extends React.Component {
	constructor() {
		super();
		this.state = {
			user: jsonwebtoken.decode(localStorage.getItem("token"))
				? jsonwebtoken.decode(localStorage.getItem("token"))
				: null,
			username: "",
			going: null,
			addToggle: false,
			allUsers: []
		};
	}

	addGuest = e => {
		e.preventDefault();
		// Checks to see if user exists
		this.props.allUsers.map(el => el.name).includes(this.state.username)
			? this.props
					.addGuest(
						`http://localhost:5000/event/${this.props.event_id}/guests`,
						// `https://potlucker-planner.herokuapp.com/event/${
						// 	this.props.event_id
						// }/guests`,
						{
							username: this.props.allUsers.find(
								el => el.name === this.state.username
							).username,
							going: null
						}
					)
					.then(() =>
						this.props.getSingleEvent(
							`http://localhost:5000/event/${this.props.event_id}`
							// `https://potlucker-planner.herokuapp.com/event/${this.props.event_id}`
						)
					)
			: alert(
					`${this.state.username} is not in the system! Please invite ${
						this.state.username
					} to join Potluck Planner!`
			  );
		// No check for if user exists
		// this.props.addGuest(
		// 	`https://potlucker-planner.herokuapp.com/event/${
		// 		this.props.event_id
		// 	}/guests`,
		// this.props.addGuest(
		// 	`http://localhost:5000/event/${this.props.event_id}/guests`,
		// 	{
		// 		username: this.state.username,
		// 		going: null
		// 	}
		// );
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		console.log(this.props);
		console.log(this.state);
		return (
			<div className="eventGuests">
				<h1>Guest List</h1>
				{this.props.singleEvent.guests.map(guest => (
					<p key={guest.username}>{guest.username}</p>
				))}
				<form className="guestForm" onSubmit={this.addGuest}>
					<input
						onChange={this.handleChange}
						name="username"
						id="username"
						placeholder="Enter Guest Name To Invite"
						value={this.state.username}
						type="text"
						className="guestInput"
						required
					/>
				</form>
			</div>
		);
	}
}

export default EventGuests;
