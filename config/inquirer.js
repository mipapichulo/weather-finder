const { indexColor } = require('../utils');

class InquirerOptions {

	get menu(){
		return [
			{
				type : 'list',
				name : 'option',
				message : 'What do you want to do?',
				choices : [
					{
						name : indexColor(1, 'Search place'),
						value : 1
					},
					{
						name : indexColor(2, 'View search history'),
						value : 2
					},
					{
						name : indexColor('0', 'Exit'),
						value : 0
					}
				]
			}
		]	
	}

	get pause(){
		return [
			{
				type : 'input',
				name : 'pause',
				message : `Press ${'ENTER'.green} to continue`
			}
		]
	}

	get languagePlaces(){
		return {
				type : 'list',
				name : 'language',
				message : 'Select a language:',
				choices : [
					{
						name : indexColor(1, 'Spanish'),
						value : "es",
					},
					{
						name : indexColor(2, 'English'),
						value : "en"
					}
			 ]
		 }
	}

	get limitPlaces(){
		return {
			type : 'input',
			name : 'limit',
			message : 'Put a limit of results:',
			validate(msg){
				if(Number(msg) <= 0 || isNaN(Number(msg))){
					return "The number must be greater than 0";
				}
				return true;
			}	
		}
	}

	getListPlaces(places){
		const choices = places.map((p, i) => ({
			value : p.id,
			name : indexColor(i + 1, `${p.name} (${p.type})`)
		}));

		choices.unshift({
			value : 0,
			name : indexColor(0, 'Cancel')
		})

		return [
			{
				type : 'list',
				name : 'selected',
				message : 'Choose one',
				choices	
			}
		]
	}

	get searchPlace(){
		return {
				type : 'input',
				name : 'place',
				message : 'Put a place:',
				validate(msg){
					if(msg.trim().length == 0){
						return 'Put something!';
					}
					return true;
				}
			}	
	}

}

module.exports = InquirerOptions;
