import React from "react";
import { addFood } from "../actions";
import { connect } from "react-redux";
import jsonwebtoken from "jsonwebtoken";

class AddFood extends React.Component {
  constructor() {
    super();
    this.state = {
      user: jsonwebtoken.decode(localStorage.getItem("token"))
        ? jsonwebtoken.decode(localStorage.getItem("token"))
        : null,
      recipe_name: "",
      quantity: ""
    };
  }
  handleChange = event => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  render() {
    console.log(this.props);
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          this.props.addFood(
            `https://potlucker-planner.herokuapp.com/event/${
              this.props.event_id
            }/foodlist`,
            {
              recipe_name: this.state.recipe_name,
              quantity: this.state.quantity
            }
          );
          this.props.history.push(`/event/${this.props.event_id}`);
        }}
      >
        <input
          onChange={this.handleChange}
          name="recipe_name"
          id="recipe_name"
          placeholder="Enter Food Name"
          value={this.state.recipe_name}
          type="text"
          className="addElement"
          required
        />
        <input
          onChange={this.handleChange}
          name="quantity"
          id="quantity"
          placeholder="Enter Quantity"
          value={this.state.quantity}
          type="number"
          className="addElement"
          required
        />
        <button> Add Food</button>
      </form>
    );
  }
}

export default connect(
  null,
  { addFood }
)(AddFood);
