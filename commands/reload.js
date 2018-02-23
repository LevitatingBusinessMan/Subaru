module.exports = {
	name: 'reload',
	catagory: 'Admin',
	description: 'Can reload a command',
	usage: 'reload ping.js',
	admin: true,
	
	run : async (Subaru, client, args, message) => {
		try {
			const reload = require('require-reload')(require);
			if (reload(`./${args[0]}`)){
				let name = args[0].split('.')[0];
				Subaru.cmd[name] = reload(`./${args[0]}`);
				Subaru.cmd[name].file = args[0];
				//Subaru.respond(message, `Succesfully reloaded \`${args[0]}\``);
				Subaru.respond(message, {embed: {color: 0x00ff00, description: `Succesfully reloaded \`${args[0]}\``}});
				Subaru.log('OK', args[0] + ' was succesfully reloaded');
			}
		} catch (err) {
			message.channel.send({embed: {color: 0xff0000, title: err.toString(), description: err.stack.toString()}});
			//Subaru.error(err, message);
			Subaru.log('warn', 'Failed reloading ' + args[0])
		}
	}
}