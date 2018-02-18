import React from 'react';
import ReactDOM from 'react-dom';

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
    let allTodos = this.state.items.slice();
    allTodos.push({taskText: task, completed: false});
    this.setState({
      items: allTodos
    }, function() {});
  }

  render() {
    return (<div>
      <InputLine tasks={this.state.items} onSubmit={(task) => this.addTodo(task)}/>
      <ul>
        {this.state.items.map((item) => <Todo key={key++} task={item} onSwitch={() => this.removeTodo(item)}/>)}
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
        <input type="submit" value="X" onClick={(task) => this.props.onSwitch(task)}/>{this.props.task.taskText}
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
