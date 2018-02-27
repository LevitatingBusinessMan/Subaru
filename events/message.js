module.exports = {
	name: "message",
	run : (Subaru, client, message) => {
		try {
		if (message.author.bot) return;
		
		//AFK feature
		if (message.content.includes('<@') && message.content.includes('>')){
			let msg = message.content;
			if (msg.split('<@').length - 1 < 2){ //Disallow for multiple mentions in 1 msg
			// VVV for nickname mentions
			if (msg.includes('<@!')) var id = msg.substr(msg.indexOf('<@!') + 3, (msg.indexOf('>') - msg.indexOf('<@') - 3));
			else var id = msg.substr(msg.indexOf('<@') + 2, (msg.indexOf('>') - msg.indexOf('<@') - 2));
			if (Subaru.USERS.get(id)) {
				let user = Subaru.USERS.get(id);
				if (user.afk) Subaru.respond(message, {embed:{
					title: user.username + ' is AFK',
					color: 0xff0000,
					description: user.afk
					}});
			}
			}
		}
		
		//Automatic tableflip feature
		if (message.content.includes('(╯°□°）╯︵ ┻━┻') && Subaru.GUILDS.get(message.guild.id).autoTableflip){
			let count = message.content.split('(╯°□°）╯︵ ┻━┻').length -1;
			Subaru.respond(message, ('┬─┬ ノ( ゜-゜ノ) \n').repeat(count));
		}
		
		let prefix = (Subaru.GUILDS.get(message.guild.id).prefix ? Subaru.GUILDS.get(message.guild.id).prefix  : Subaru.config.prefix);
		if (!message.content.startsWith(prefix) && !message.content.startsWith('<@' + client.user.id + '>')) return;
		
		if (message.content.startsWith('<@' + client.user.id + '>')) var r_args = message.content.substr(client.user.id.length + 4).split(/\s/g);
		if (message.content.startsWith(prefix)) var r_args = message.content.substr(prefix.length).split(/\s/g);
		
		var command = r_args[0];
		var args = r_args.splice(1);
		if (Subaru.cmd[command] && !Subaru.cmd[command].disabled) {
			//Create new user if nessecary VV then run command
			Subaru.newUser(message.author).then(() => {
				if (Subaru.cmd[command].admin && !Subaru.config.admin.includes(message.author.id)) { Subaru.respond(message, "This command is for admins only"); return;}
				cmd = Subaru.cmd[command];
				cmd.run(Subaru, client, args, message);
			});
		} else if (Subaru.cmd[command]){Subaru.respond(message, "This command is disabled.")}
		//Add to messages that werent commands
		else Subaru.editMessages.set(message.id, message.content + ' - ' + message.author.username);
		
		} catch (err) {
			Subaru.error(err, message);
		}
	}
}