import React from 'react';
import ReactDOM from 'react-dom';
const dbUrl = "http://localhost:3000/db";

let dummyData = [
  {
    taskText: "Catch 'em all",
    completed: true
  }, {
    taskText: "Clean my room",
    completed: false
  }, {
    taskText: "Call mom",
    completed: false
  }
];
let key = 0;

class TodoApp extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (<div><TodoList/></div>);
  }
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: dummyData
    };
  }

  removeTodo(task) {
    let allTodos = this.state.items;
    var obj = allTodos.find(o => o.taskText === task.taskText);
    var indexOfTodo = allTodos.indexOf(obj);
    allTodos.splice(indexOfTodo, 1);
    this.setState({
      items: allTodos
    }, function() {});
  }

  addTodo(task) {

        axios.post(dbUrl + '/add',
        {task: task.taskText,
        completed: false})
          .then(function (response) {
            console.log(response);
            this.setState({ items: this.state.items.concat(response.data)});
          })
          .catch(function (error) {
            console.log(error);
          });
  }

  toggleTodo(task) {
      let allTodos = this.state.items;
      var obj = allTodos.find(o => o.taskText === task.taskText);
      var indexOfTodo = allTodos.indexOf(obj);
      obj.completed =  !(obj.completed);
      allTodos.splice(indexOfTodo, 1, obj);
      this.setState({
        items: allTodos
      }, function() {});
  }

  render() {
    return (<div>
      <InputLine tasks={this.state.items} onSubmit={(task) => this.addTodo(task)}/>
      <ul>
        {this.state.items.map((item) => <Todo key={key++} task={item} onToggle={() => this.toggleTodo(item)} onSwitch={() => this.removeTodo(item)}/>)}
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
        <input type="submit" value="X" onClick={(task) => this.props.onSwitch(task)}/><span onClick={()=> this.props.onToggle(this.props.task)}>{this.props.task.taskText}</span>
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
