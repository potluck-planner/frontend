import React from "react";
import { Link } from "react-router-dom";
import { getSingleEvent } from "../actions";
import { connect } from "react-redux";

class EventCard extends React.Component {
	componentDidMount() {
		// const URL = `http://localhost:5000/event/${this.props.event_id}`;
		const URL = `https://potlucker-planner.herokuapp.com/event/${
			this.props.event_id
		}`;
		this.props.getSingleEvent(URL);
	}

	deleteEvent = e => {
		e.preventDefault();
		this.props.deleteEvent(
			// `http://localhost:5000/event/${this.props.event_id}`
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
					<div className="buttonDiv">
						{this.props.activeUser.id === this.props.organizer_id && (
							<div onClick={e => this.deleteEvent(e)} className="deleteButton">
								<i className="far fa-trash-alt">
									<span>Delete this event</span>
								</i>
							</div>
						)}
						{this.props.activeUser.id !== this.props.organizer_id && (
							<>
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
								<div className="deleteButton">
									<i className="fas fa-times">
										<span>Decline invite</span>
									</i>
								</div>
							</>
						)}
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
	singleEvent: state.singleEventReducer.singleEvent,
	activeUser: state.loginReducer.activeUser
});

export default connect(
	mapStateToProps,
	{ getSingleEvent }
)(EventCard);
