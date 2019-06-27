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
					<div className="buttonDiv">
						{/* hosts see delete event button, guests see confirm or decline buttons */}
						{this.props.activeUser.id === this.props.organizer_id && (
							<div onClick={e => this.deleteEvent(e)} className="deleteButton">
								<i className="far fa-trash-alt">
									<span>Delete this event</span>
								</i>
							</div>
						)}
						{/* guests see confirm or decline buttons */}
						{this.props.activeUser.id !== this.props.organizer_id && (
							<>
								{/* check to see if already confirmed, if so do not display confirm button */}
								{this.props.going === null && (
									<div
										// function is hosted one level up so events listing refreshes
										onClick={e =>
											this.props.confirmEvent(e, this.props.event_id)
										}
										className="confirmButton"
									>
										<i className="fas fa-check">
											<span>Confirm your attendance</span>
										</i>
									</div>
								)}
								<div
									// function is hosted one level up so events listing refreshes
									onClick={e => this.props.deleteGuest(e, this.props.event_id)}
									className="deleteButton"
								>
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
					<p>
						Organizer:{" "}
						{/* use allUsers array to get name of organizer as event endpoint only provides organizer id */}
						{this.props.allUsers.find(
							user => user.id === this.props.organizer_id
						)
							? this.props.allUsers.find(
									user => user.id === this.props.organizer_id
							  ).name
							: null}
					</p>
					<p>Date: {this.props.date}</p>
					<p>
						{this.props.going === null
							? "Please Confirm Attendance"
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
