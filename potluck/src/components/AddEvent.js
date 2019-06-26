import React from "react";
import { connect } from "react-redux";
import { addEvent } from "../actions";
import jsonwebtoken from "jsonwebtoken";

class AddEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      user: jsonwebtoken.decode(localStorage.getItem("token"))
        ? jsonwebtoken.decode(localStorage.getItem("token"))
        : null,
      organizer_id: "",
      event_name: "",
      description: "",
      date: new Date(),
      time: "12:00"
    };
  }

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	addEvent = event => {
		event.preventDefault();
		const newEvent = {
			organizer_id: this.state.user.id,
			event_name: this.state.event_name,
			description: this.state.description,
			date: this.state.date,
			time: this.state.time
		};
		this.props.addEvent(
			"https://potlucker-planner.herokuapp.com/event/",
			newEvent
		);
		this.props.history.push(`/`);
	};

	render() {
		console.log(this.props);
		return (
			<form onSubmit={this.addEvent} className="eventAdd">
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
					value={this.state.location}
					type="time"
					className="addElement"
					required
				/>
				<button>Add Event</button>
			</form>
		);
	}
}

export default connect(
	null,
	{ addEvent }
)(AddEvent);
