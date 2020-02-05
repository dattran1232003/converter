const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('index');
});
router.get('/read-number', (req, res) => {
	res.render('read-number');
})

module.exports = router;