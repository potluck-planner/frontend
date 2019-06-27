import React from "react";

class AddFood extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recipe_name: "",
			quantity: 1,
			guest_name: null,
			being_brought: false
		};
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	addFood = e => {
		e.preventDefault();
		console.log(this.props.singleEvent.food);
		this.props.singleEvent.food
			.map(food => food.recipe_name)
			.includes(this.state.recipe_name)
			? // Checks to see if recipe name already exists in listing
			  alert(`${this.state.recipe_name} has already been added!`)
			: this.props
					.addFood(
						`https://potlucker-planner.herokuapp.com/event/${
							this.props.event_id
						}/foodlist`,
						{
							recipe_name: this.state.recipe_name,
							quantity: 1,
							guest_name: null,
							being_brought: false
						}
					)
					.then(() =>
						this.props.getSingleEvent(
							`https://potlucker-planner.herokuapp.com/event/${
								this.props.event_id
							}`
						)
					);
	};

	render() {
		console.log(this.props);
		return (
			<>
				<div>
					<button onClick={e => this.addFood(e)}>Add Food</button>
				</div>
				<form onSubmit={e => this.addFood(e)}>
					<input
						onChange={this.handleChange}
						name="recipe_name"
						id="recipe_name"
						placeholder="Enter Food Name"
						value={this.state.recipe_name}
						type="text"
						className="foodForm"
						required
					/>
				</form>
			</>
		);
	}
}

export default AddFood;
