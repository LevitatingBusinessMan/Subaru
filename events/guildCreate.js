module.exports = {
	name: "guildCreate",
	run : (Subaru, client, guild) => {
		try {
			var doc = {
				name: guild.name,
				id: guild.id,
				prefix: false,
				autoroles: false,
				musicChannel: false,
				autoTableflip: true,
				greetingChannel: false,
				farewell: false,
				greeting: false
			}
		Subaru.GUILDS.setAsync(guild.id, doc).then(() => Subaru.log('warn', 'Added: ' + guild.name));
		
		//log to channel
		if (Subaru.config.logChannel) Subaru.config.logChannel.send('Joined guild:', {embed:{
				color: 0x00ff00,
				thumbnail: {url: guild.iconURL},
				title: guild.name,
				description: guild.id,
				fields: [{
					name: 'Members:',
					value: guild.members.size,
					inline: true
				},{
					name: 'Bots:',
					value: guild.members.array().filter(x => x.user.bot).length,
					inline: true
				}],
				timestamp: new Date(),
				footer: {
						icon_url: guild.owner.user.avatarURL,
						text: guild.owner.user.tag
				}
			}});
		} catch (err) {
			Subaru.error(err);
		}
	}
}