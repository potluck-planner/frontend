import React from "react";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";

class Event extends React.Component {
  render() {
    return (
      <div className="event">
        <Link to={`/event/${this.props.id}`} className="viewDiv">
          View Event
        </Link>
        <EventCard {...this.props} />
      </div>
    );
  }
}

export default Event;
