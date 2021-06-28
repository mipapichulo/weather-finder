const moment = require('moment');
require('colors');

const indexColor = (i, text) => {
	if(typeof i !== 'number' && typeof i !== 'string'){
		throw new Error('This method only received string or number, type received: ' + typeof i);
	}
	if(typeof i === 'number' || !i.endsWith('.')){
		i += '.';
	}	

	return `${i.green} ${text}`;
}

const spaceLine = (space = 1) => {
	for(let i = 0; i < space; i++){
		console.log();					
	}	
}

const getDateNow = () => moment().format('MMMM Do YYYY, h:mm:ss a');

const setTitle = (title) => {
	console.clear();
	console.log(title);
}

const waitMessage = () => console.log('\nWait please...'.yellow.bold);
			
module.exports = {
	indexColor,
	spaceLine,
	setTitle,
	waitMessage,
	getDateNow
}
