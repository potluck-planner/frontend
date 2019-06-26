import React from "react";
import { updateEventLocation } from "../actions";
import { connect } from "react-redux";

class EventLocation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			updatingLocation: false,
			address: "",
			city: "",
			state: ""
			// address: this.props.singleEvent.location.address,
			// city: this.props.singleEvent.location.city,
			// state: this.props.singleEvent.location.state
		};
	}

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

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	updateEventLocation = e => {
		e.preventDefault();
		const updatedLocation = {
			address: this.state.address,
			city: this.state.city,
			state: this.state.state
		};
		this.props
			.updateEventLocation(
				// `http://localhost:5000/event/${this.props.event_id}/location`,
				`https://potlucker-planner.herokuapp.com/event/${
					this.props.event_id
				}/location`,
				updatedLocation
			)
			.then(() =>
				this.props.getSingleEvent(
					// `http://localhost:5000/event/${this.props.event_id}`
					`https://potlucker-planner.herokuapp.com/event/${this.props.event_id}`
				)
			);
		this.setState({ updatingLocation: false });
	};

	// location might need [0] in front if Erik keeps as array

	render() {
		console.log(this.props);
		return (
			<div className="eventLocation">
				<div onClick={this.updateLocation} className="updateButton">
					<i className="far fa-edit" />
				</div>
				<h1>Location Details</h1>
				{this.state.updatingLocation === false ? (
					<div>
						<p>Address: {this.props.singleEvent.location.address}</p>
						<p>City: {this.props.singleEvent.location.city}</p>
						<p>State: {this.props.singleEvent.location.state}</p>
					</div>
				) : (
					<form onSubmit={this.updateEventLocation} className="eventAdd">
						<label htmlFor="address">Address</label>
						<input
							onChange={this.handleChange}
							name="address"
							id="address"
							placeholder="Enter Event Address"
							value={this.state.address}
							type="text"
							className="addElement"
							required
						/>
						<label htmlFor="city">City</label>
						<input
							onChange={this.handleChange}
							name="city"
							id="city"
							placeholder="Enter Event City"
							value={this.state.city}
							type="text"
							className="addElement"
							required
						/>
						<label htmlFor="state">State</label>
						<input
							onChange={this.handleChange}
							name="state"
							id="state"
							placeholder="Enter Event State"
							value={this.state.state}
							type="text"
							className="addElement"
							required
						/>
						<button>Update Location</button>
					</form>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	error: state.singleEventReducer.error,
	updatingEventLocation: state.singleEventReducer.updatingEventLocation,
	singleEvent: state.singleEventReducer.singleEvent
});

export default connect(
	mapStateToProps,
	{ updateEventLocation }
)(EventLocation);
