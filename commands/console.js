module.exports = {
	name: 'console',
	catagory: 'Admin',
	description: 'Show the console',
	usage: 'eval Subaru.respond(\'pizza\')',
	admin: true,
	
	run : async (Subaru, client, args, message) => {
		try {
				Subaru.respond(message,'```ini\n' + Subaru.console + '```');
		} catch (err) {
			message.channel.send({embed: {color: 0xff0000, title: err.toString(), description: err.stack.toString()}});
			Subaru.error(err, message);
		}
	}
}