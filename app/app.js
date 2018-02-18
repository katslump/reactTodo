import React from 'react';
import ReactDOM from 'react-dom';

let dummyData = ["Clean my room", "Review ES6", "Call mom"];
let key = 0;

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: dummyData
    };
  }

  render() {
    return (<div>
      <ul>
        {this.state.items.map((item) => <Todo key={key++} task={item}/>)}
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
      <li><input type="submit" value="X"/>{this.props.task}</li>
    </div>);
  }
}

ReactDOM.render(<TodoList/>, document.getElementById('root'));
