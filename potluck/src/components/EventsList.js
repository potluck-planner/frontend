import React from "react";
import Event from "./Event";

class EventsList extends React.Component {
  render() {
    return (
      <div className="EventsList">
        <h1>Events Listing</h1>
        <ul>
          Placeholder Placeholder Placeholder Placeholder Placeholder
          {/* {this.props.eventsList.map(Event => {
            return <Event {...Event} key={Event.id} />;
          })} */}
        </ul>
      </div>
    );
  }
}

export default EventsList;
