import React from "react";

class EventGuests extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "",
			going: null,
			addToggle: false
		};
	}

	addToggle = e => {
		e.preventDefault();
		if (this.state.addToggle === false) {
			this.setState({
				addToggle: true
			});
		} else {
			this.setState({
				addToggle: false
			});
		}
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	addGuest = e => {
		e.preventDefault();
		// Checks to see if user exists in database
		this.props.allUsers.map(el => el.name).includes(this.state.username)
			? // Checks to see if user has already been invited
			  !this.props.allUsers
					.map(element =>
						this.props.singleEvent.guests
							.map(el => el.username)
							.includes(element.username)
							? element.name
							: null
					)
					.includes(this.state.username)
				? this.props
						.addGuest(
							`https://potlucker-planner.herokuapp.com/event/${
								this.props.event_id
							}/guests`,
							{
								username: this.props.allUsers.find(
									el => el.name === this.state.username
								).username,
								going: null
							}
						)
						.then(() =>
							this.props.getSingleEvent(
								`https://potlucker-planner.herokuapp.com/event/${
									this.props.event_id
								}`
							)
						)
				: alert(`${this.state.username} has already been invited!`)
			: alert(
					`${this.state.username} is not in the system! Please invite ${
						this.state.username
					} to join Potluck Planner!`
			  );
		this.setState({ username: "", addToggle: false });
	};

	deleteGuest = (e, guest) => {
		e.preventDefault();
		this.props
			.deleteGuest(
				`https://potlucker-planner.herokuapp.com/event/${
					this.props.event_id
				}/guests`,
				{ data: { event_id: this.props.event_id, username: guest.username } },
				this.props.event_id
			)
			.then(() =>
				this.props.getSingleEvent(
					`https://potlucker-planner.herokuapp.com/event/${this.props.event_id}`
				)
			);
	};

	render() {
		console.log(this.props);
		return (
			<div className="eventGuests">
				<div>
					<button onClick={this.addToggle}>Invite Guests</button>
				</div>
				{/* displays invite guest form if addtoggle status is on */}
				{this.state.addToggle === true && (
					<div>
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
				)}
				<h1>Guest List</h1>
				{this.props.singleEvent.guests.map(guest => (
					<div key={guest.username} className="guestList">
						<p className="guestName">
							{/* use allUsers array to get full names for guests array, which only has username */}
							{this.props.allUsers.find(
								user => user.username === guest.username
							)
								? this.props.allUsers.find(
										user => user.username === guest.username
								  ).name
								: null}
						</p>
						<p className="guestAttend">
							{/* check guest attending status and conditionally render */}
							{guest.going === null ? (
								<span className="invited">"Invited..."</span>
							) : (
								<span className="attending">"Confirmed!"</span>
							)}
						</p>
						{/* only host can see following host-star or delete buttons */}
						{this.props.organizer_id === this.props.activeUser.id && (
							<div>
								{/* if host, then star icon, if guest, option to delete */}
								{this.props.activeUser.username === guest.username ? (
									<p className="hostIcon">
										<i className="fas fa-star" />
									</p>
								) : (
									<p
										onClick={e => this.deleteGuest(e, guest)}
										className="deleteGuest"
									>
										<i className="far fa-trash-alt" />
									</p>
								)}
							</div>
						)}
					</div>
				))}
			</div>
		);
	}
}

export default EventGuests;
