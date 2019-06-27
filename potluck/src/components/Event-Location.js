import React from "react";
import { addEventLocation, updateEventLocation } from "../actions";
import { connect } from "react-redux";

class EventLocation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			updatingLocation: false,
			// check if adding or updating location, if updating, fill with existing information
			address: this.props.singleEvent.location[0]
				? this.props.singleEvent.location[0].address
				: "",
			city: this.props.singleEvent.location[0]
				? this.props.singleEvent.location[0].city
				: "",
			state: this.props.singleEvent.location[0]
				? this.props.singleEvent.location[0].state
				: ""
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

	addEventLocation = e => {
		e.preventDefault();
		const newLocation = {
			address: this.state.address,
			city: this.state.city,
			state: this.state.state
		};
		this.props
			.addEventLocation(
				// `http://localhost:5000/event/${this.props.event_id}/location`,
				`https://potlucker-planner.herokuapp.com/event/${
					this.props.event_id
				}/location`,
				newLocation
			)
			.then(() =>
				this.props.getSingleEvent(
					// `http://localhost:5000/event/${this.props.event_id}`
					`https://potlucker-planner.herokuapp.com/event/${this.props.event_id}`
				)
			);
		this.setState({ updatingLocation: false });
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

	render() {
		console.log(this.props);
		return (
			<div className="eventLocation">
				<div onClick={this.updateLocation} className="updateButton">
					<i className="far fa-edit" />
				</div>
				<h1>Location Details</h1>
				{/* toggle between display location info and add/update form */}
				{this.state.updatingLocation === false ? (
					<div className="locDetails">
						<p className="locElement eventAddress">
							<span>Address: </span>
							{this.props.singleEvent.location[0]
								? this.props.singleEvent.location[0].address
								: ""}
						</p>
						<p className="locElement eventCity">
							<span>City: </span>
							{this.props.singleEvent.location[0]
								? this.props.singleEvent.location[0].city
								: ""}
						</p>
						<p className="locElement eventState">
							<span>State: </span>
							{this.props.singleEvent.location[0]
								? this.props.singleEvent.location[0].state
								: ""}
						</p>
					</div>
				) : (
					<form
						// check if location exists, if not then use add function, if yes then use update function
						onSubmit={
							this.props.singleEvent.location.length === 0
								? this.addEventLocation
								: this.updateEventLocation
						}
						className="eventAdd"
					>
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
	{ addEventLocation, updateEventLocation }
)(EventLocation);
