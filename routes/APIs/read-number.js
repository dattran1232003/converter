const path = require('path');
const root = '../../';

const { 
	getEachClassString, 
	getFullStringNumber, 
	getEachClassNumber 
} = require(path.join(root, 'helpers/readNumber'));

module.exports = {
	get : (req, res) => {
		const number = req.params.number;
		console.log(number);
		res.json({
			number,
			fullString 			: getFullStringNumber(number),
			arrayStringNumber	: getEachClassString(number),
			arrayClassNumber	: getEachClassNumber(number)
		});
	}
}