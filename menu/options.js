const inquirer = require('inquirer');
const MapBox = require('../models/mapbox');
const OpenWeather = require('../models/openweather');
const History = require('./history');
const { spaceLine, setTitle, waitMessage, indexColor } = require('../utils');
require('colors');

class MenuOptions {

	constructor(inquirerOptions){
		this.inquirerOptions = inquirerOptions;
		this.mapbox = new MapBox();
		this.openweather = new OpenWeather();
		this.history = new History();
	}

	async searchPlace(){
		// ask place, language (es, en) and limit
		let { place, language, limit } = await inquirer.prompt([
			this.inquirerOptions.searchPlace,
			this.inquirerOptions.limitPlaces,
			this.inquirerOptions.languagePlaces
		]);
		//clean space
		place = place.trim();	
		language = language.trim();	
		limit = limit.trim();
		waitMessage();
		// getPlaces
		const places = await this.mapbox.getPlaces(place, limit, language);
		setTitle(`${'=======> Results found:'.green} ${places.length.toString().yellow}\n`)
		// check for results
		if(places.length){
			// select place
			const { selected } = await inquirer.prompt(this.inquirerOptions.getListPlaces(places));
			// verify that it isn't 0
			if(selected === 0) return;
			waitMessage();
			const { name, lat, lon } = places.find(p => p.id === selected);
			//add search to history
			this.history.addSearch(name);
			// getWeather of place selected
			const weather = await this.openweather.getWeather(lat, lon, language);
			// print info 
			this.printInfoPlace({
				name, 
				lat, 
				lon, 
				...weather 
			}, lat, lon)
		}else{
			spaceLine();
			console.log(`Ups! Didn't ${'find'.yellow} what you were you looking for`);
		}
	}

	searchHistory(){
		spaceLine();
		this.history.searches.forEach( ({ search, date }, i) => {
			console.log(indexColor(i + 1, `${search} - (${date.yellow})`));	
		})
	}

	printInfoPlace(info){
		const {
			name,
			lat,
			lon,
			temp,
			temp_min,
			temp_max,
			description
		} = info
		setTitle("=======> Information of the place selected\n".cyan);
		console.log("Name : " + name.green);	
		console.log("Coordinates".blue);	
		console.log("  Latitude  : " + lat.toString().yellow);	
		console.log("  Longitude : " + lon.toString().yellow);	
		console.log("Temperatures".blue);	
		console.log("  Current : " + temp.yellow);	
		console.log("  Minimum : " + temp_min.yellow);	
		console.log("  Maximum : " + temp_max.yellow);	
		console.log("Weather : " + description.green);	
	}

}

module.exports = MenuOptions;
