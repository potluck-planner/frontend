import React from "react";

const EventFood = props => {
	console.log(props);
	return (
		<li>{`${props.food.recipe_name}, number: ${props.food.quantity}, ${
			props.food.guest_name
		},
	${props.food.being_brought}`}</li>
	);
};

export default EventFood;
