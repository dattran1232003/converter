const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Init application
const app = express();
const server = require('http').Server(app);

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

// Template
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

// set routes
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/APIs'))

// socket.io
const moduleSocketIO = require('./controllers/socketIO');
moduleSocketIO(server);

// Port & listening
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));