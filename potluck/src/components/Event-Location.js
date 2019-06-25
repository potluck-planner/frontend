import React from "react";

class EventLocation extends React.Component {
	constructor() {
		super();
		this.state = {
			updatingLocation: false
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

	render() {
		console.log(this.props);
		return (
			<div className="eventLocation">
				<div onClick={this.updateLocation} className="updateButton">
					<i className="far fa-edit" />
				</div>
				<h1>Location Details</h1>
				{/* location might need [0] in front if Erik keeps as array */}
				<ul>
					<p>Address: {this.props.singleEvent.location.address}</p>
					<p>City: {this.props.singleEvent.location.city}</p>
					<p>State: {this.props.singleEvent.location.state}</p>
				</ul>
			</div>
		);
	}
}

export default EventLocation;
