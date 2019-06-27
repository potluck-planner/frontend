import React from "react";
import AddFood from "./AddFoodForm";

class EventFood extends React.Component {
	deleteFood = (e, recipe_name) => {
		e.preventDefault();
		this.props
			.deleteFood(
				`https://potlucker-planner.herokuapp.com/event/${
					this.props.event_id
				}/foodlist`,
				{ data: { event_id: this.props.event_id, recipe_name: recipe_name } },
				this.props.event_id
			)
			.then(() =>
				this.props.getSingleEvent(
					`https://potlucker-planner.herokuapp.com/event/${this.props.event_id}`
				)
			);
	};

	render() {
		console.log(this.props);
		return (
			<div className="eventFood">
				<AddFood {...this.props} addFood={this.props.addFood} />
				<h1>Food List</h1>
				<div className="foodTitle">
					<h4 className="foodTitleName">Item Name</h4>
					<h4 className="foodTitleGuest">Claimed By</h4>
					<h4 className="foodTitleButton">
						{this.props.organizer_id === this.props.activeUser.id
							? "Claim/Delete"
							: "Claim"}
					</h4>
				</div>
				<div className="foodList">
					{this.props.singleEvent.food.map(food => (
						<div key={food.recipe_name} className="foodObject">
							<div className="foodName">{food.recipe_name}</div>
							<div className="foodGuest">
								{food.guest_name ? food.guest_name : ""}
							</div>
							<div className="foodButton">
								<i className="fas fa-check" />
								{this.props.organizer_id === this.props.activeUser.id ? (
									<i
										className="far fa-trash-alt"
										onClick={e => this.deleteFood(e, food.recipe_name)}
									/>
								) : null}
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default EventFood;
