const API = require('../config/api');
require('dotenv').config();

class OpenWeather {
	
	constructor(){
		this.api = new API('https://api.openweathermap.org/data/2.5/weather');
	}

	async getWeather(lat, lon, lang = "es"){
		this.api.createParams({
			lat,
			lon,
			appid : process.env.OPENWEATHER_KEY,
			units : "metric",
			lang
		});		
		const { main : { temp, temp_min, temp_max }, weather : [ { description } ] } = await this.api.GET('');
		return {
			temp : `${temp} °C`,
			temp_min : `${temp_min} °C`,
			temp_max : `${temp_max} °C`,
			description
		}
	}

}

module.exports = OpenWeather;
