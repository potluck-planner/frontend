import React from "react";
import AddFood from "./AddFoodForm";

class EventFood extends React.Component {
	render() {
		console.log(this.props);
		return (
			<div className="eventFood">
				<h1>Food List</h1>
				<div>
					{this.props.singleEvent.food.map(food => (
						<div key={food.recipe_name} className="foodList">
							{`${food.recipe_name}, Quantity: ${food.quantity}`}
						</div>
					))}
				</div>
				<AddFood {...this.props} key={this.props.quantity} />
			</div>
		);
	}
}

export default EventFood;
