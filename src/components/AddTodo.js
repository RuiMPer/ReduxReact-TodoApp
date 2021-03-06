import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodoAction } from "../actions/todos";

class AddTodo extends Component {
	state = {
		newTodoName: "",
	};

	generateId = () => {
		return (
			Math.random().toString(36).substring(2) +
			new Date().getTime().toString(36)
		);
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	handleAddNewTodo = (event) => {
		event.preventDefault();
		let newTodo = {
			id: this.generateId(),
			name: this.state.newTodoName,
		};
		this.setState({ newTodoName: "" });

		//Lift the state up - this is not necessary anymore
		// this.props.onAddNewTodo(newTodo);
		this.props.handleAddTodo(newTodo);
	};

	render() {
		return (
			<form onSubmit={this.handleAddNewTodo}>
				<input
					id="todo"
					type="text"
					name="newTodoName"
					value={this.state.newTodoName}
					onChange={this.handleChange}
					placeholder="Add Todo"
				></input>
				<input type="submit" value="Add Todo"></input>
			</form>
		);
	}
}

const mapDispacthToProps = (dispatch) => ({
	handleAddTodo: (todo) => dispatch(addTodoAction(todo)),
});

export default connect(null, mapDispacthToProps)(AddTodo);
