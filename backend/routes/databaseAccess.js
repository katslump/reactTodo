const express = require('express');
const router = express.Router();

var app = express();


var TodoItem = require('../models/TodoItem.js');

app.get('/add', (req, res) => {

    const testTodo = new TodoItem({
        task: "test task",
        completed: false
    });

    testTodo.save()
      .then(response => {
        res.send(response);
      })
      .catch(error => {
        res.send(error);
      })
});

module.exports = app;
