const path = require('path');
const root = '../../';
const R = require('ramda');

const getAllNumberFromText = R.compose(R.join(''), R.match(/\d/g));
const { 
	getEachClassString, 
	getFullStringNumber, 
	getEachClassNumber 
} = require(path.join(root, 'helpers/readNumber'));

module.exports = {
	get : (req, res) => {
		const number = getAllNumberFromText(req.query['number']);
		console.log(number);
		res.json({
			number,
			fullString 			: getFullStringNumber(number),
			arrayStringNumber	: getEachClassString(number),
			arrayClassNumber	: getEachClassNumber(number)
		});
	}
}