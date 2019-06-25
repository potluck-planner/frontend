import React from "react";

class EventInfo extends React.Component {
	constructor() {
		super();
		this.state = {
			updatingInfo: false
		};
	}

	updateInfo = e => {
		e.preventDefault();
		if (this.state.updatingInfo === false) {
			this.setState({
				updatingInfo: true
			});
		} else {
			this.setState({
				updatingInfo: false
			});
		}
	};

	render() {
		console.log(this.props);
		return (
			<div className="eventInfo">
				<div onClick={this.updateInfo} className="updateButton">
					<i className="far fa-edit" />
				</div>
				<h1>Event Information</h1>
				<p>Event Name: {this.props.singleEvent.event.event_name}</p>
				{/* Need to bring in organizer/host name */}
				{/* <p>Organizer: {this.props.singleEvent.event.organizer}</p> */}
				<p>Date: {this.props.singleEvent.event.date}</p>
				<p>Time: {this.props.singleEvent.event.time}</p>
				<p>Description: {this.props.singleEvent.event.description}</p>
			</div>
		);
	}
}

export default EventInfo;
