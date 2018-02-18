const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var TodoItem = require('../models/TodoItem.js');

app.post('/add', (req, res) => {
    const newTodo = new TodoItem({
        task: req.body.task,
        completed: req.body.completed
    });

    newTodo.save()
      .then(response => {
        console.log("Todo added successfully")
      })
      .catch(error => {
        res.send(error);
      })
});


app.get('/all', (req, res) => {
    TodoItem.find()
    .catch(error => {
        res.send(error);
    })
    .then(response => {
         res.send({todos: response});
    })
});


module.exports = app;
