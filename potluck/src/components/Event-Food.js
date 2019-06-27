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

	claimFood = (e, recipe_name) => {
		e.preventDefault();
		this.props
			.updateFood(
				`https://potlucker-planner.herokuapp.com/event/${
					this.props.event_id
				}/foodlist`,
				// check to see if guest name for the food item is blank
				this.props.singleEvent.food.find(
					food => food.recipe_name === recipe_name
				).guest_name === null
					? // if it is blank, fill in name with current active user
					  {
							guest_name: this.props.allUsers.find(
								el => el.id === this.props.activeUser.id
							).name,
							recipe_name: recipe_name
					  }
					: // if it's not blank, check to see if the person who claimed the food is the current active user
					this.props.singleEvent.food.find(
							food => food.recipe_name === recipe_name
					  ).guest_name ===
					  this.props.allUsers.find(el => el.id === this.props.activeUser.id)
							.name
					? // if the guest who claimed the food and activeuser are the same, allow uncheck
					  { guest_name: null, recipe_name: recipe_name }
					: //otherwise alert
					  alert(`${recipe_name} has already been claimed!`)
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
								<i
									className="fas fa-check"
									onClick={e => this.claimFood(e, food.recipe_name)}
								/>
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
