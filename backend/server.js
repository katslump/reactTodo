const express = require('express');
var fs = require('fs');
const app = express();
var mongoose = require('mongoose');
const dbRoutes = require('./routes/databaseAccess.js');
var bodyParser = require('body-parser');

var TodoItem = require('./models/TodoItem.js').Todo;

if (! fs.existsSync('./env.sh')) {
  throw new Error('env.sh file is missing');
}
if (! process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}
mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function() {
  console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
  process.exit(1);
});
mongoose.connect(process.env.MONGODB_URI);

// This line makes the build folder publicly available.
app.use(express.static('build'));
app.use(bodyParser.json());
app.use('/db', dbRoutes);


app.listen(3000, () => {
  console.log('Server for React Todo App listening on port 3000!')
});
