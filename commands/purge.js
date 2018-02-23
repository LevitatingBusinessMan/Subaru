module.exports = {
	name: 'purge',
	catagory: 'Moderation',
	description: 'Remove messages from a channel',
	usage: 'purge 100',
	detailedDescription:'Parameters: \n `-bot` to delete messages from bots only \n' +
						'`-u [user]` to delete messages from a specific user \n' +
						'`-from [messagesID]` to delete all messages that came after this messages\n' + 
						'Example: `prefix.purge 20 -u AnnoyingSpammer`\n' +
						'Note: this will delete up to 20 messages of the last 100',
	
	run : async (Subaru, client, args, message) => {
		try {
			if (!args[0]) {Subaru.respond(message, 'You didn\'t specify an amount!'); return;}
			if (isNaN(args[0])) {Subaru.respond(message, 'That is not a number!'); return;}
			if (args[0] > 100) {Subaru.respond(message, '100 messages is max!'); return;}
			
			let clientUserGuild = message.guild.members.array().filter(m => {return m.id ==client.user.id});
			if (!clientUserGuild[0].hasPermission('MANAGE_MESSAGES')) {Subaru.respond(message, "I don't have the permission to delete messages!"); return;}
			
			let author = message.guild.members.array().filter(m => {return m.id == message.author.id});
			if (!author[0].hasPermission('MANAGE_MESSAGES')) {Subaru.respond(message, "You don't have the permission to delete messages!"); return;}
			
			if (!args[1]){
				var messages = await message.channel.fetchMessages({limit: args[0]});
			}
			else if (args[1] == '-bot') {
				let allMessages = await message.channel.fetchMessages({limit: 100});
				var messages = allMessages.filter(x => x.author.bot);
			} 
			else if (args[1] == '-u') {
				if (!args[2]) {Subaru.respond(message, 'You didn\'t define a user!'); return;}
				let GuildMember = Subaru.getUser(args[2], message.guild.members);
				if (!GuildMember) {Subaru.respond(message, 'I couldn\'t find that user!'); return;}
				let allMessages = await message.channel.fetchMessages({limit: 100});
				var messages = allMessages.filter(x => x.author == GuildMember.user);
			}
			else if (args[1] == '-from') {
				if (!args[2]) {Subaru.respond(message, 'You didn\'t define a message!'); return;}
				if (isNaN(args[2])) {Subaru.respond(message, 'That is not a message id!'); return;}
				let allMessages = await message.channel.fetchMessages({limit: 100});
				let fooMessage = allMessages.get(args[2])
				if (!fooMessage) {Subaru.respond(message, 'I couldn\'t find a message by that id'); return;}
				var messages = await message.channel.fetchMessages({limit: 100, after: args[2]});
				} else {
				Subaru.respond(message, 'That is not a valid parameter!')
			}
			for (var i = 0; args[0] > i && messages.array().length > i; i++){
				messages.array()[i].delete();
			}
			Subaru.respond(message, 'Deleted `' + i + '` messages');
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

