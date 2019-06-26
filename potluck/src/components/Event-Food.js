import React from "react";

const EventFood = props => {
  console.log(props);
  return <li>{`${props.recipe_name}, Quantity: ${props.quantity}, `}</li>;
};

export default EventFood;
