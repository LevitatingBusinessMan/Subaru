module.exports = (rType, msg) => {
	const chalk = require('chalk');
	let d = new Date();
	
	let hour = d.getHours().toString() + (d.getHours().toString().length == 1 ? '0' : "");
	let minutes = d.getMinutes().toString() + (d.getMinutes().toString().length == 1 ? '0' : "");
	let seconds = d.getSeconds().toString() + (d.getSeconds.toString().length == 1 ? '0' : "");
		
	let type = rType.toUpperCase();
	if (type == 'OK') console.log(`[${chalk.green(type + ' ' + hour + ':' + minutes + ':' + seconds)}] ${msg}`);
	if (type == 'WARN')  console.log(`[${chalk.yellow(type + ' ' + hour + ':' + minutes + ':' + seconds)}] ${msg}`);
	if (type == 'ERR') console.log(`[${chalk.red(type + ' ' + hour + ':' + minutes + ':' + seconds)}] ${msg}`);	
}