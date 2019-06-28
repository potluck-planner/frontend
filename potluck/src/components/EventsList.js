import React from "react";
import EventCard from "./EventCard";
import Loader from "react-loader-spinner";
import {
  getEvents,
  deleteEvent,
  updateGuest,
  deleteGuest,
  getUsers
} from "../actions";
import { connect } from "react-redux";
import eventImg from "./img/event.png";
// import Moment from "react-moment";

class EventsList extends React.Component {
  componentDidMount() {
    const URL = `https://potlucker-planner.herokuapp.com/users/${
      this.props.activeUser.username
    }/events`;
    this.props
      .getEvents(URL)
      .then(
        this.props.getUsers(`https://potlucker-planner.herokuapp.com/users/`)
      );
  }

  // confirm/updateGuest is hosted here so that events listing refreshes
  confirmEvent = (e, event_id) => {
    e.preventDefault();
    this.props
      .updateGuest(
        `https://potlucker-planner.herokuapp.com/event/${event_id}/guests`,
        { username: this.props.activeUser.username, going: true }
      )
      .then(() =>
        this.props.getEvents(
          `https://potlucker-planner.herokuapp.com/users/${
            this.props.activeUser.username
          }/events`
        )
      );
  };

  // deleteGuest is hosted here so that events listing refreshes
  deleteGuest = (e, event_id) => {
    e.preventDefault();
    this.props
      .deleteGuest(
        `https://potlucker-planner.herokuapp.com/event/${event_id}/guests`,
        {
          data: {
            event_id: event_id,
            username: this.props.activeUser.username
          }
        },
        event_id
      )
      .then(() =>
        this.props.getEvents(
          `https://potlucker-planner.herokuapp.com/users/${
            this.props.activeUser.username
          }/events`
        )
      );
  };

  render() {
    console.log(this.props);
    if (this.props.fetchingEvents) {
      return (
        <div className="loadingIcon">
          <Loader type="TailSpin" color="#1f2a38" height="100" width="100" />
        </div>
      );
    } else if (this.props.error) {
      return <h1>Sorry, it's us, not you</h1>;
    }
    return (
      <div className="eventsList">
        <h1>Your Upcoming Events</h1>
        <ul>
          {/* sort events display by date */}
          {this.props.events
            .sort((a, b) => {
              return (
                new Date(a.date) - new Date(b.date)
                // ||
                // <Moment parse="HH:mm:ss">{a.time}</Moment> -
                // <Moment parse="HH:mm:ss">{b.time}</Moment>
              );
            })
            .map(event => {
              return (
                <div className="eventsPage">
                  <EventCard
                    {...event}
                    {...this.props}
                    key={event.event_id}
                    deleteEvent={this.props.deleteEvent}
                    confirmEvent={this.confirmEvent}
                    deleteGuest={this.deleteGuest}
                    className="eventCard"
                  />
                </div>
              );
            })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.fetchDataReducer.error,
  fetchingEvents: state.fetchDataReducer.fetchingEvents,
  events: state.fetchDataReducer.events,
  allUsers: state.fetchUsers.allUsers
});

export default connect(
  mapStateToProps,
  { getEvents, deleteEvent, updateGuest, deleteGuest, getUsers }
)(EventsList);
