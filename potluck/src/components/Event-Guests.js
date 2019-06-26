import React from "react";
import jsonwebtoken from "jsonwebtoken";
// import { axiosWithAuth } from "../util/axiosWithAuth";

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

	// componentDidMount() {
	// 	axiosWithAuth()
	// 		.get("https://potlucker-planner.herokuapp.com/users")
	// 		.then(res => {
	// 			this.setState({ allUsers: res.data });
	// 		})
	// 		.catch(err => {
	// 			console.log(err.response);
	// 		});
	// }

	addGuest = e => {
		e.preventDefault();
		this.props.addGuest(
			`https://potlucker-planner.herokuapp.com/event/${
				this.props.event_id
			}/guests`,
			{
				username: this.state.username,
				going: null
			}
		);
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
