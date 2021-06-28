const axios = require('axios');
require('colors'); class API { 
	constructor(baseURL){
		this.instance = axios.create({
			baseURL,
			headers : { "Content-Type" : "application/json" }
		});

	}

	createParams(params){
		if(typeof params !== 'object'){
			throw new Error("The params have to be a object".yellow);
		}
		this.params = params;
	}


	async GET(url){
		try{ const res = await this.instance.get(url, {
				params : this.params 
			});
			return res.data;
		}catch(err){
			if(err.response.status === 404){
				console.log(err.response);
				throw new Error("Response terminated with code 404!".red);
			}
			console.log(err.response);
			return [];
		}
	}

}

module.exports = API;
