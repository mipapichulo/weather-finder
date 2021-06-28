const API = require('../config/api');
require('dotenv').config();

class MapBox {

	constructor(){
		this.api = new API('https://api.mapbox.com/geocoding/v5/mapbox.places');
	}

	async getPlaces(place, limit = 5, language = "es"){
		this.api.createParams({ 
			access_token : process.env.MAPBOX_KEY,
			limit,
			language 
		});		
		const { features } = await this.api.GET(`/${place}.json`);
		if(features.length){
			return features.map(p => ({
				id : p.id,
				name : p.place_name,
				lat : p.center[1],
				lon : p.center[0],
				type : p.place_type[0]
			}));
		}
		return [];	
	}
}

module.exports = MapBox;
