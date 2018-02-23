module.exports = {
	name: 'prefix',
	catagory: 'Moderation',
	description: 'Change the bot\'s prefix. Admins only',
	usage: 'prefix s!',
	
	run : async (Subaru, client, args, message) => {
		try {
			let guild = await Subaru.GUILDS.get(message.guild.id);
			if (!guild) {Subaru.respond(message, "Something went wrong :v"); return;}
			
			if (!args[0]) {Subaru.respond(message, 'Current prefix: \`' + (guild.prefix ? guild.prefix : Subaru.config.prefix) + '\`'); return;}
			
			let author = message.guild.members.array().filter(m => {return m.id == message.author.id});
			if (!author[0].hasPermission('ADMINISTRATOR')) {Subaru.respond(message, "You don't have the administator permission!"); return;}
			
			guild.prefix = args[0]; 
			Subaru.GUILDS.set(guild.id, guild);
			Subaru.respond(message, "Changed prefix to: \`" + args[0] + '\`');
			
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

