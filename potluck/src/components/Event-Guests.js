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
		// Checks to see if user exists or if there is a duplicate
		this.props.allUsers.map(el => el.name).includes(this.state.username)
			? !this.props.allUsers
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
							// `http://localhost:5000/event/${this.props.event_id}/guests`,
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
								// `http://localhost:5000/event/${this.props.event_id}`
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
				// `http://localhost:5000/event/${this.props.event_id}/guests`,
				`https://potlucker-planner.herokuapp.com/event/${
					this.props.event_id
				}/guests`,
				{ data: { event_id: this.props.event_id, username: guest.username } },
				this.props.event_id
			)
			.then(() =>
				this.props.getSingleEvent(
					// `http://localhost:5000/event/${this.props.event_id}`
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
							{this.props.allUsers.filter(
								user => user.username === guest.username
							)[0]
								? this.props.allUsers.filter(
										user => user.username === guest.username
								  )[0].name
								: null}
						</p>
						<p className="guestAttend">
							{guest.going === null ? (
								<span className="invited">"Invited..."</span>
							) : (
								<span className="attending">"Confirmed!"</span>
							)}
						</p>
						{this.props.organizer_id === this.props.activeUser.id && (
							<p
								onClick={e => this.deleteGuest(e, guest)}
								className="deleteGuest"
							>
								<i className="far fa-trash-alt" />
							</p>
						)}
					</div>
				))}
			</div>
		);
	}
}

export default EventGuests;
