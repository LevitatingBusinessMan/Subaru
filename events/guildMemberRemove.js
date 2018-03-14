module.exports = {
	name: "guildMemberRemove",
	run : async (Subaru, client, guildMember) => {
		try {
			
			let guild = Subaru.GUILDS.get(guildMember.guild.id);
			if (guild.greetingChannel && guild.farewell){
				let channel = client.channels.get(guild.greetingChannel);
				if (!channel) return;
				channel.send(guild.farewell
				.replace('%user&', guildMember.user.username)
				.replace('%user-tag%', guildMember.user.tag)
				.replace('%user-mention%', `<@${guildMember.user.id}>`)
				.replace('%guild%', guildMember.guild.name)
				);
			}
			
		} catch (err) {
			Subaru.error(err);
		}
	}
}