const express = require('express');
const app = express();

app.use(express.json());

const tasks = require('./routes/tasks');
const auth = require('./routes/auth');

app.use('/api/', tasks)
app.use('/api/', auth)


module.exports = app