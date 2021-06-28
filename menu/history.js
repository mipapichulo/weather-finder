const fs = require('fs');
const { join } = require('path');
const { getDateNow } = require('../utils');

class History {

	constructor(){
		const data = fs.readFileSync(
			`${join(__dirname, '..', 'database')}/searches.json`,
			{ encoding : 'utf-8' }
		);
		this.searches = !data.startsWith('[') ? [] : JSON.parse(data)

	}

	addSearch(search){
		if(this.searches.length === 10){
			this.searches.pop();
		}
		this.searches = [{
			search,
			date : getDateNow()
		}, ...this.searches]	

		fs.writeFileSync(
			`${join(__dirname, '..', 'database')}/searches.json`, 
			JSON.stringify(this.searches)
		);
	}

}

module.exports = History;
