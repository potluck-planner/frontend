import React from "react";
import { connect } from "react-redux";
import { addEvent } from "../actions";

class AddEvent extends React.Component {
	constructor() {
		super();
		this.state = {
			organizer_id: "",
			event_name: "",
			description: "",
			date: new Date(),
			time: "12:00",
			address: "",
			city: "",
			state: ""
		};
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	createEvent = event => {
		event.preventDefault();
		const newEvent = {
			// organizer_id: this.props.activeUser.id,
			organizer_id: this.props.activeUser.id,
			event_name: this.state.event_name,
			description: this.state.description,
			date: this.state.date,
			time: this.state.time
		};
		// const newEventLocation = {
		// 	address: this.props.address,
		// 	city: this.props.city,
		// 	state: this.props.state
		// };
		this.props
			.addEvent("http://localhost:5000/event/", newEvent)
			// .addEvent("https://potlucker-planner.herokuapp.com/event/", newEvent)
			.then(() => this.props.history.push(`/`));
	};

	render() {
		console.log(this.props);
		console.log(this.state);
		return (
			<form onSubmit={this.createEvent} className="eventAdd">
				<label htmlFor="event_name">Event Name</label>
				<input
					onChange={this.handleChange}
					name="event_name"
					id="event_name"
					placeholder="Enter Event Name"
					value={this.state.event_name}
					type="text"
					className="addElement"
					required
				/>
				<label htmlFor="description">Description</label>
				<input
					onChange={this.handleChange}
					name="description"
					id="description"
					placeholder="Enter Description"
					value={this.state.description}
					type="text"
					className="addElement"
					required
				/>
				<label htmlFor="date">Date</label>
				<input
					onChange={this.handleChange}
					name="date"
					id="date"
					placeholder="Enter date"
					value={this.state.date}
					type="date"
					className="addElement"
					required
				/>
				<label htmlFor="time">Time</label>
				<input
					onChange={this.handleChange}
					name="time"
					id="time"
					placeholder="Enter time"
					value={this.state.time}
					type="time"
					className="addElement"
					required
				/>
				<button>Create Event</button>
			</form>
		);
	}
}

const mapStateToProps = state => ({
	activeUser: state.loginReducer.activeUser
});

export default connect(
	mapStateToProps,
	{ addEvent }
)(AddEvent);
