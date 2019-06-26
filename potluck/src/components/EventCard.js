import React from "react";
import { Link } from "react-router-dom";
import { getSingleEvent } from "../actions";
import { connect } from "react-redux";

class EventCard extends React.Component {
	componentDidMount() {
		const URL = `https://potlucker-planner.herokuapp.com/event/${
			this.props.event_id
		}`;
		this.props.getSingleEvent(URL);
	}

	deleteEvent = e => {
		e.preventDefault();
		this.props.deleteEvent(
			`https://potlucker-planner.herokuapp.com/event/${this.props.event_id}`
		);
	};

	render() {
		console.log(this.props);
		return (
			<div className="eventCard">
				<div className="cardTop">
					<Link to={`/event/${this.props.event_id}`} className="viewDiv">
						View Event
					</Link>
					{/* need connect/functionality here to confirm and delete/decline event */}
					<div className="buttonDiv">
						<div
							// onClick should have hover with text saying confirm
							// onClick should only appear if guest has not already confirmed
							/*onClick={this.props.confirmEvent}*/
							className="updateButton"
						>
							<i className="fas fa-check">
								<span>Confirm your attendance</span>
							</i>
						</div>
						<div
							// onClick should have hover with text saying decline
							// for organizers it could say delete
							onClick={e => this.deleteEvent(e)}
							className="deleteButton"
						>
							<i className="far fa-trash-alt">
								<span>Delete this event</span>
							</i>
						</div>
					</div>
				</div>

				<div>
					<p>Event Name: {this.props.event_name}</p>
					<p>Organizer: {this.props.username}</p>
					<p>Date: {this.props.date}</p>
					<p>
						{this.props.going === null
							? "Please Confirm"
							: "You Are Confirmed!"}
					</p>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	error: state.singleEventReducer.error,
	fetchingSingleEvent: state.singleEventReducer.updatingEvent,
	singleEvent: state.singleEventReducer.singleEvent
});

export default connect(
	mapStateToProps,
	{ getSingleEvent }
)(EventCard);
