
const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const locRouter = require('./routes/loc');
let app = express();

app.use(express.json());

// ../public is the directory for the static ressources
// GET http://localhost:8000/ or GET http://localhost:8000/index.html 
// returns the index.html in /public
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', indexRouter);

app.use('/users', usersRouter);
app.use('/loc', locRouter);

// send "Not found" for all other 'paths'
app.use(function(req, res) {
  res.status(404).send('Not found: ' + req.path);
});

// error handler
app.use(function(err, res) {
  // send the error page
  res.status(err.status || 500).send('error' + err.message);
});

module.exports = app;
