const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const root = '../';

const read_number = require('./APIs/read-number');
app.route('/read-number')
	.get(read_number.get);

module.exports = app;