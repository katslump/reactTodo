// Importing needed npm packages
const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');

var app = express();

// Set up bodyparser to enable access to POST key values
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Import TodoItem model
var TodoItem = require('../models/TodoItem.js');

// Enables the end user to create a new todo item in the database
app.post('/add', (req, res) => {
  const newTodo = new TodoItem({task: req.body.task, completed: req.body.completed});

  newTodo.save().then(response => {
    res.send(response);
  }).catch(error => {
    res.send(error);
  })
});

// Enables the end user to toggle a todo item from "complete" to "incomplete", vice-versa, in the database
app.post('/toggle', (req, res) => {
  TodoItem.findOneAndUpdate({
    _id: req.body.id
  }, {
    $set: {
      completed: !req.body.completed
    }
  }, function(err, doc) {
    if (err) {
      res.send(error);
    } else {
      res.send(doc);
    }
  });
});

// Enables the end user to remove a todo item from the database
app.post('/remove', (req, res) => {
  TodoItem.remove({_id: req.body.id}).then(response => {
    res.send(response);
  }).catch(error => {
    res.send(error);
  });

});

// Enables the end user to grab all todo items in the database
app.get('/all', (req, res) => {
  TodoItem.find().catch(error => {
    res.send(error);
  }).then(response => {
    res.send({todos: response});
  })
});

module.exports = app;
