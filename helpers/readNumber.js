const R = require('ramda');

const divider = R.curry((dvFor, number, arr=[]) => {
	const leftNumber  = Math.floor(number/dvFor);
	const newArr = R.append(number%dvFor, arr);
	return (leftNumber < 1) ? 
		newArr.reverse() : divider(dvFor, Math.floor(leftNumber), newArr);
});
const dozensSub = (number) => (number === 1) ? ' ' : ' mươi ';
const readOne  = (location, beforeNumber) => (location === 2) ? 'mười' : (location === 3) ? (beforeNumber <= 1 ? 'một' : 'mốt') : 'một';
const readFour = (location, beforeNumber) => (location === 3) ? (beforeNumber <= 1 ? 'bốn' : 'tư') : 'bốn';
const readFive = (location, beforeNumber) => (location === 3 && (beforeNumber > 0 || beforeNumber <= 9)) ? 'lăm' : 'năm';
const readANumber = R.curry((number, location=0, beforeNumber=0) => {
	switch(number) {
		case 0: return 'linh';
		case 1: return readOne(location, beforeNumber);
		case 2: return 'hai';
		case 3: return 'ba';
		case 4: return readFour(location, beforeNumber);
		case 5: return readFive(location, beforeNumber);
		case 6: return 'sáu';
		case 7: return 'bảy';
		case 8: return 'tám';
		case 9: return 'chín';
	}
});
const readArr1Numbers = (arrN) => (arrN.length === 1) ? readANumber(arrN[0], 1) : arrN;
const readArr2Numbers = (arrN) => (arrN.length === 2) ? readANumber(arrN[0], 2) + dozensSub(arrN[0]) + readANumber(arrN[1], 3, arrN[0]) : arrN;
const readArr3Numbers = (arrN) => {
	if (arrN.length === 3) {
		const units	= arrN[0];
		const dozens 	= arrN[1];
		const hundreds	= arrN[2];
		const stringUnits = readANumber(units, 1);
		const stringDozens	 = readANumber(dozens, 2);
		const stringHundreds	 = readANumber(hundreds, 3, dozens);
		return stringUnits + ' trăm ' + stringDozens + dozensSub(dozens) + stringHundreds;
	}
	return arrN;
};

const readEachNumber = R.compose(readArr1Numbers, readArr2Numbers, readArr3Numbers);
const readClassNumber = number => R.map(i => divider(10, i), divider(1000, number)).map(i => readEachNumber(i)).reverse()

/*  */

/*đệ quy*/
//const unitsCreator = R.curry((arrUnits, index) =>  (index <= 4) ? arrUnits : unitsCreator(R.append(arrUnits[R.length(arrUnits)-3]+' tỷ', arrUnits), index--))
/*không đệ quy*/
const unitsCreator = R.curry((arrUnits, index) => {
	while (index > 4) {
		let newUnits = arrUnits[R.length(arrUnits)-3]+'tỷ ';
		arrUnits.push(newUnits);
		index--;
	} return arrUnits;
});
const createVNUnits = unitsCreator(['', 'nghìn ', 'triệu ', 'tỷ '])
const units = R.compose(createVNUnits, R.length, readClassNumber);
const builer = R.curry((arrUnits, arrNumbers) => arrNumbers.map((x, i) => x +' '+arrUnits[i]).reverse());
const readNumber = number => builer(units(number), readClassNumber(number));

/*  */

const isLastIndex = (index, arr) => index >= arr.length-1;
const mapIndexed = R.addIndex(R.map);
const spliter = arrNumber => mapIndexed((val, i) => val+"'", arrNumber);
const splitToArr = R.compose(spliter, divider(1000));
//const abc = number => R.reduce(R.concat, '', split(number)).slice(0, -1);
const sliceLastChar = str => str.slice(0, -1);
const split = R.compose(sliceLastChar, R.reduce(R.concat, ''), splitToArr)

/*  */

const getEachClassString = readNumber;
const getFullStringNumber = R.compose(R.reduce(R.concat, ''), getEachClassString);
const getEachClassNumber = divider(1000, R.__);

exports.getEachClassString	= getEachClassString
exports.getFullStringNumber	= getFullStringNumber
exports.getEachClassNumber	= getEachClassNumber