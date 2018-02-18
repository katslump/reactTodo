import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
let key = 0;
const dbUrl = "http://localhost:3000/db";

class TodoApp extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {}

  render() {
    return (<div>
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

  removeTodo(task) {
    let allTodos = this.state.todos;
    var obj = allTodos.find(o => o.taskText === task.taskText);
    var indexOfTodo = allTodos.indexOf(obj);
    allTodos.splice(indexOfTodo, 1);
    this.setState({
      todos: allTodos
    }, function() {});
  }

  addTodo(task) {
    axios.post(dbUrl + '/add', {
      task: task,
      completed: false
    }).then(function(response) {
      console.log(response);
      this.setState({
        todos: this.state.todos.concat(response.data)
      });
    }).catch(function(error) {
      console.log(error);
    });
  }

  toggleTodo(task) {
    let allTodos = this.state.todos;
    var obj = allTodos.find(o => o.taskText === task.taskText);
    var indexOfTodo = allTodos.indexOf(obj);
    obj.completed = !(obj.completed);
    allTodos.splice(indexOfTodo, 1, obj);
    this.setState({
      todos: allTodos
    }, function() {});
  }

  render() {
    return (<div>
      <InputLine tasks={this.state.todos} onSubmit={(task) => this.addTodo(task)}/>
      <ul>
        {this.state.todos.map((item) => <Todo key={key++} task={item} onToggle={() => this.toggleTodo(item)} onSwitch={() => this.removeTodo(item)}/>)}
      </ul>
    </div>);
  }
}

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div>
      <li style={this.props.task.completed
          ? {
            'textDecoration': 'line-through'
          }
          : {
            color: 'black'
          }}>
        <input type="submit" value="X" onClick={(task) => this.props.onSwitch(task)}/>
        <span onClick={() => this.props.onToggle(this.props.task)}>{this.props.task.taskText}</span>
      </li>
    </div>);
  }
}

class InputLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: ''
    };
  }

  addNewTodo(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.task);
  }

  handleTodoChange(e) {
    this.setState({task: e.target.value});
  }

  render() {
    return (<div>
      <form onSubmit={(e) => this.addNewTodo(e)}>
        <input type="text" placeholder="task" onChange={(e) => this.handleTodoChange(e)} value={this.state.task}/>
        <input type="submit" value="Add todo"/>
      </form>
    </div>);
  }
}

ReactDOM.render(<TodoApp/>, document.getElementById('root'));
