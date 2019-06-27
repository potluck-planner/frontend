import React from "react";
import { Link } from "react-router-dom";
import { getSingleEvent, updateGuests } from "../actions";
import { connect } from "react-redux";

class EventCard extends React.Component {
	componentDidMount() {
		// const URL = `http://localhost:5000/event/${this.props.event_id}`;
		const URL = `https://potlucker-planner.herokuapp.com/event/${
			this.props.event_id
		}`;
		this.props.getSingleEvent(URL);
	}

	confirmEvent = e => {
		e.preventDefault();
		console.log(
			this.props.singleEvent.guests.map(guest =>
				guest.username === this.props.activeUser.username
					? { ...guest, going: 1 }
					: guest
			)
		);
		this.props.updateGuests(
			// `http://localhost:5000/event/${this.props.event_id}/guests`
			`https://potlucker-planner.herokuapp.com/event/${
				this.props.event_id
			}/guests`,
			this.props.singleEvent.guests.map(guest =>
				guest.username === this.props.activeUser.username
					? { ...guest, going: 1 }
					: guest
			)
		);
	};

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
									onClick={e => this.confirmEvent(e)}
									className="confirmButton"
								>
									<i className="fas fa-check">
										<span>Confirm your attendance</span>
									</i>
								</div>
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
						{this.props.allUsers.filter(
							user => user.id === this.props.organizer_id
						)[0]
							? this.props.allUsers.filter(
									user => user.id === this.props.organizer_id
							  )[0].name
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
	{ getSingleEvent, updateGuests }
)(EventCard);
