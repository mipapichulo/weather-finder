const InquirerOptions = require('../config/inquirer');
const MenuOptions = require('./options');
const inquirer = require('inquirer');
const { spaceLine, setTitle } = require('../utils');

class Menu {

	constructor(){
		this.inquirerOptions = new InquirerOptions();
		this.options = new MenuOptions(this.inquirerOptions);
	}

	async show(){
		let res;
		do{
			setTitle(
				"================================\n".green +
				"        Choose an option\n" +
				"================================\n".green
			);
			res = await inquirer.prompt(this.inquirerOptions.menu);	
			if(res.option === 0) {
				console.clear();
				break;
			}
			await this.chooseOption(res);
		}while(res.option !== 0);
	}

	async chooseOption({ option }){
		switch(option)	{
			case 1:
				await this.options.searchPlace();
				break;
			case 2:
				this.options.searchHistory();
				break;
		}
		await this.pause();
	}

	async pause(){
		spaceLine();
		await inquirer.prompt(this.inquirerOptions.pause);	
	}

}

module.exports = Menu;
