// The following web app (TodoApp) contains a list (TodoList) of items (TodoItems) to be completed
// A user can add a new todo via the textbox and submit button on the page
// A user can toggle a todo item to "complete" or "incomplete" by clicking on the individual todo item
// A user can delete a todo item by clicking the "X" button to its left


// Importing needed npm packages
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// Key variable to keep key count on TodoItem's
let key = 0;

// Database URL needed for AJAX requests
const dbUrl = "http://localhost:3000/db";


class TodoApp extends React.Component {
  constructor(props) {
    super(props);
  }

  // Renders the TodoApp component
  render() {
    return (<div className="form-group">
      <TodoList/>
    </div>);
  }
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  // Performs AJAX request that gets all todos in the DB
  // before component loads on the page.
  // Sets todos state on success, errors otherwise
  componentWillMount() {
    let self = this;
    axios.get(dbUrl + '/all').then(function(response) {
      self.setState({todos: response.data.todos});
    }).catch(function(error) {
      console.log(error);
    });
  }

  // Removes a todo from the list when the X button is clicked
  // Performs removal via an AJAX request containing the todo id
  // Sets todos state on success, errors otherwise
  removeTodo(task) {
    let self = this;
    axios.post(dbUrl + '/remove', {id: task._id}).then(function(response) {
      let allTodos = self.state.todos;
      var obj = allTodos.find(o => o.task === task.task);
      var indexOfTodo = allTodos.indexOf(obj);
      allTodos.splice(indexOfTodo, 1);
      self.setState({
        todos: allTodos
      }, function() {});
    }).catch(function(error) {
      console.log(error);
    });
  }

  // Adds a todo from the list when a new todo is entered in the input line and submit is pressed
  // Performs addition via an AJAX request containing the todo task and completion attribute
  addTodo(task) {
    let self = this;
    axios.post(dbUrl + '/add', {
      task: task,
      completed: false
    }).then(function(response) {
      self.setState({ todos: self.state.todos.concat(response.data)});
    }).catch(function(error) {
      console.log(error);
    });
  }

  // Toggles todo "complete" or "not complete" on click
  // Performs an AJAX request to update the todo in the DB
  // Sets todos state on success, errors otherwise
  toggleTodo(task) {
    var self = this;
    axios.post(dbUrl + '/toggle', {
      id: task._id,
      completed: !(obj.completed)
    }).then(function(response) {
      let allTodos = this.state.todos;
      var obj = allTodos.find(o => o.task === task.task);
      var indexOfTodo = allTodos.indexOf(obj);
      obj.completed = !(obj.completed);
      allTodos.splice(indexOfTodo, 1, obj);
      self.setState({
        todos: allTodos
      }, function() {});
    }).catch(function(error) {
      console.log(error);
    });

  }

  // Renders TodoList element
  render() {
    return (<div className="panel">
      <InputLine tasks={this.state.todos} onSubmit={(task) => this.addTodo(task)}/>
      <ul className="list-group">
        {this.state.todos.map((item) => <TodoItem key={key++} task={item} onToggle={() => this.toggleTodo(item)} onSwitch={() => this.removeTodo(item)}/>)}
    </ul></div>
    );
  }
}

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Renders TodoItem component
  render() {
    return (
      <li className="list-group-item" style={this.props.task.completed
          ? {
            'textDecoration': 'line-through'
          }
          : {
            color: 'black'
          }}>
        <div className="col-xs-9 col-md-9" onClick={() => this.props.onToggle(this.props.task)}>{this.props.task.task}</div>
        <div className="col-xs-3 col-md-3"><button type="button" className="close" onClick={(task) => this.props.onSwitch(task)}><span aria-hidden="true">&times;</span></button></div>
      </li>
    );
  }
}

class InputLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: ''
    };
  }

  // Runs when button X is clicked for a given TodoItem
  addNewTodo(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.task);
  }

  // Runs when TodoItem is clicked (or toggled)
  handleTodoChange(e) {
    this.setState({task: e.target.value});
  }

  // Renders TodoItem component
  render() {
    return (
      <form onSubmit={(e) => this.addNewTodo(e)}>
        <input type="text" placeholder="task" onChange={(e) => this.handleTodoChange(e)} value={this.state.task}/>
        <input type="submit" className="btn btn btn-primary" value="Add todo"/>
      </form>
    );
  }
}

// Renders TodoApp component in the DOM
ReactDOM.render(<TodoApp/>, document.getElementById('root'));
