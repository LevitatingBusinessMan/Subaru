module.exports = (rType, msg) => {
	const chalk = require('chalk');
	let d = new Date();
	let type = rType.toUpperCase();
	if (type == 'OK') console.log(`[${chalk.green(type + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds())}] ${msg}`);
	if (type == 'WARN')  console.log(`[${chalk.yellow(type + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds())}] ${msg}`);
	if (type == 'ERR') console.log(`[${chalk.red(type + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds())}] ${msg}`);	
}