module.exports = {
	name: "guildCreate",
	run : (Subaru, client, guild) => {
		try {
			var doc = {
				name: guild.name,
				id: guild.id,
				prefix: false,
				autoroles: false
			}
		Subaru.GUILDS.setAsync(guild.id, doc).then(() => Subaru.log('warn', 'Added: ' + guild.name));
		} catch (err) {
			Subaru.error(err);
		}
	}
}