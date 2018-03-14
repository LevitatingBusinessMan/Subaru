module.exports = {
	name: 'autoflip',
	catagory: 'Moderation',
	description: 'Choose if the bot should auto unflip flipped tables',
	usage: 'autoflip',
	detailedDescription: '`prefix.autoflip` to view current settings \n' +
						'`prefix.autoflip -on` To turn the feature on (Admin)\n' +
						'`prefix.autoflip -off` To turn the feature off (Admin)\n',
	
	run : async (Subaru, client, args, message) => {
		try {
			let guild = await Subaru.GUILDS.get(message.guild.id);
			if (!guild) {Subaru.respond(message, "Something went wrong :v"); return;}
			
			if (!args[0]) Subaru.respond(message, "Autounflipping is: `" + guild.autoTableflip + '`');
			else if (args[0] == '-on' || args[0] == '-off') {
				let author = message.guild.members.get(message.author.id);
				if (!author.hasPermission('MANAGE_GUILD')) {Subaru.respond(message, "You don't have the **manage server** permission!"); return;}
				
				if (args[0] == '-off') guild.autoTableflip = false;
				if (args[0] == '-on') guild.autoTableflip = true;
				Subaru.GUILDS.setAsync(guild.id, guild).then(() => Subaru.respond(message, "Autounflipping is now: `" + guild.autoTableflip + '`'))
				.catch(err => {Subaru.log('warn', 'Trying to set Autoflip:\n' + err);Subaru.respond(message, 'Error changing setting'); return;});
			}
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}
