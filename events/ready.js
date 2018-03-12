module.exports = {
	name: "ready",
	run : async (Subaru, client) => {
		try {
		const chalk = require('chalk');
		Subaru.loader.stop(true);
		//client.user.setActivity(`Prefix: ${Subaru.config.prefix}`);
		require('../util/PlayingStatus.js')(client);
		
		//Check if there are any new guilds, add them to DB
		client.guilds.array().forEach(guild => {
			var doc = {
				name: guild.name,
				id: guild.id,
				prefix: false,
				autoroles: false,
				musicChannel: false,
				autoTableflip: true
			}
			if (!Subaru.GUILDS.get(guild.id)) Subaru.GUILDS.setAsync(guild.id, doc).then(() => Subaru.log('ok', 'Added: ' + guild.name));
		});
		
		console.log(chalk.red("account: ") + chalk.green(client.user.tag));
		console.log(chalk.red("guilds: ") + chalk.green(client.guilds.array().length));
		console.log(chalk.red("users: ") + chalk.green(client.users.array().length));
		console.log(chalk.red("prefix: ") + chalk.green(Subaru.config.prefix));
		} catch (err) {
			Subaru.error(err);
		}
	}
}