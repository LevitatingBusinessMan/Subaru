module.exports = {
	name: 'help',
	catagory: 'General',
	description:'Lists all commands',
	usage:'help',
	
	run : async (Subaru, client, args, message) => {
		try {
			if (!args[0]){
			//if (Subaru.config.admin.includes(message.author.id))
			//Create object with all commands sorted out
			var commands = new Object;
			for (let property in Subaru.cmd) {
				let command = Subaru.cmd[property];
				if (command.catagory != 'Admin' || command.catagory == 'Admin' && Subaru.config.admin.includes(message.author.id)){
					if (!commands[command.catagory]) commands[command.catagory] = new Object;
					commands[command.catagory][command.name] = command;
				}
			}
			//The old help, (will be remembered)
			/*var msg = '';
			for (let catagory in commands){
				msg = msg + `\`<--${catagory}-->\``;
				let C_commands = new Array;
				for (let command in commands[catagory]){
					C_commands.push(command);
				}
				msg = msg + '\n' + C_commands.join(", ").toString() + '\n'
			}
			Subaru.respond(message, msg);*/
			let embed = {
				title: client.user.username,
				thumbnail: {url:client.user.avatarURL},
				fields: []
			}
			for (let catagory in commands){
				let field = {name: catagory, value: ''}
				let C_commands = new Array;
				for (let command in commands[catagory]){
					C_commands.push(command);
				}
				field.value = C_commands.join(", ");
				embed.fields.push(field);
			}
			Subaru.respond(message, {embed});
		}else if (Subaru.cmd[args[0]]) {
			let command = Subaru.cmd[args[0]];
			let embed = {
				title: command.name,
				description: command.description,
				fields: [{
					name: 'Usage:',
					value: "\`" + Subaru.config.prefix + command.usage + "\`"
				}]
			};
			if (command.detailedDescription) embed.fields.push({name: 'Description', value: command.detailedDescription.replace(/prefix./g, Subaru.config.prefix)});
			if (command.alias) embed.fields.push({name: 'Aliases:', value: command.alias.join(', ')})
			Subaru.respond(message, {embed});
		}
		
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}