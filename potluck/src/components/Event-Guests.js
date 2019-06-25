import React from "react";

const EventGuests = props => {
	return (
		<div className="eventFood eventElement">
			<ul>
				{props.singleEvent.food.map(food => (
					<li>
						`${food.recipe_name}, number: ${food.quantity}, ${food.guest_name},
						${food.being_brought}`
					</li>
				))}
			</ul>
		</div>
	);
};

export default EventGuests;
