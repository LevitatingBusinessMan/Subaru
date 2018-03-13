	module.exports = {
	name: "guildDelete",
	run : (Subaru, client, guild) => {
		try {
			//Log to channel
			if (Subaru.config.logChannel) Subaru.config.logChannel.send('Left guild:', {embed:{
				color: 0xff0000,
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