import React from "react";
import { updateEventInfo } from "../actions";
import { connect } from "react-redux";

class EventInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updatingInfo: false,
      organizer_id: this.props.singleEvent.event.organizer_id,
      event_name: this.props.singleEvent.event.event_name,
      date: this.props.singleEvent.event.date,
      time: this.props.singleEvent.event.time,
      description: this.props.singleEvent.event.description
    };
  }
  // toggle between info and form
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

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // put to update event
  updateEvent = e => {
    e.preventDefault();
    const updatedEvent = {
      organizer_id: this.state.organizer_id,
      event_name: this.state.event_name,
      description: this.state.description,
      date: this.state.date,
      time: this.state.time
    };
    this.props
      .updateEventInfo(
        `https://potlucker-planner.herokuapp.com/event/${this.props.event_id}`,
        updatedEvent
      )
      .then(() =>
        this.props.getSingleEvent(
          `https://potlucker-planner.herokuapp.com/event/${this.props.event_id}`
        )
      );
    this.setState({ updatingInfo: false });
  };

  render() {
    console.log(this.props);
    return (
      <div className="eventInfo">
        <div onClick={this.updateInfo} className="updateButton">
          <i className="far fa-edit" />
        </div>
        <h1>Event Information</h1>
        {/* toggle between information display and update form */}
        {/* if false, information display */}
        {this.state.updatingInfo === false ? (
          <div>
            <p>Event Name: {this.props.singleEvent.event.event_name}</p>
            <p>
              Host:{" "}
              {/* convert organizer id to full name using allUsers array */}
              {this.props.allUsers.find(
                user => user.id === this.props.organizer_id
              )
                ? this.props.allUsers.find(
                    user => user.id === this.props.organizer_id
                  ).name
                : null}
            </p>
            <p>Date: {this.props.singleEvent.event.date}</p>
            <p>Time: {this.props.singleEvent.event.time}</p>
            <p>Description: {this.props.singleEvent.event.description}</p>
          </div>
        ) : (
          // if true, update form
          <form onSubmit={this.updateEvent} className="eventAdd">
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
            <button>Update Info</button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.singleEventReducer.error,
  updatingEventInfo: state.singleEventReducer.updatingEventInfo,
  singleEvent: state.singleEventReducer.singleEvent
});

export default connect(
  mapStateToProps,
  { updateEventInfo }
)(EventInfo);
