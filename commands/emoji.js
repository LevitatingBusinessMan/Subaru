module.exports = {
	name: 'emoji',
	catagory: 'Moderation',
	description:'Big multipurpose command',
	detailedDescription: 'This command can do 3 things\n' +
						'**See a custom emojis info**\n' +
						`\`prefix.emoji :customEmoji:\`` +
						'**\nCreate a new emoji**\n' +
						`\`prefix.emoji -create emojiName url reason\`` +
						'**\nAdd a role restriction to an emoji**\n' +
						`\`prefix.emoji -addRole nameOfEmoji1,nameOfEmoji2 role1,role2\`` +
						'**\nRemove a role restriction to an emoji**\n' +
						`\`prefix.emoji -removeRole nameOfEmoji1,nameOfEmoji2 role1,role2\n\``,
	usage: 'emoji :customEmoji:',
	//if anyone is going through this that isn't me, bare with me this command is awfull.
	run : async (Subaru, client, args, message) => {
		try {
			if (args[0] != '-create' && args[0] != '-addRole' && args[0] != '-removeRole'){
			if (!args[0]) {Subaru.respond(message, "Specify an emoji pls"); return;}
			
			if (args[0].includes(":")) var emojiName = args[0].substr(2, (args[0].lastIndexOf(':') -2 ));
			else var emojiName = args[0]; 
			let emoji = client.emojis.find('name', emojiName);
			if (emoji) var embed = {
				title: emoji.name,
				description: emoji.id,
				fields: [{
					name: "Animated:",
					value: emoji.animated
				},{
					name: "Created at:",
					value: Subaru.formatDate(emoji.createdAt, "dd/mm/yy")
				},{
					name: "Managed externally:",
					value: emoji.managed
				},{
					name: "Requires colons:",
					value: emoji.requiresColons
				},{
					name: "Roles:",
					value: (emoji.roles.array()[0] ? emoji.roles.array().map(x => {return x.name}).join(', ') : "everyone")
				}]
			}
			if (!emoji) {Subaru.respond(message, "I can not find that emoji!"); return;};
			if (!emoji.url.includes('.gif')) {embed.image = new Object; embed.image.url = emoji.url;}
			Subaru.respond(message, {embed : embed});
			//VVVVVVVVVVVVVVVVVV Imported from previous addEmoji command... 
			}else {
			//Check if bot has perms
			let clientUserGuild = message.guild.members.array().filter(m => {return m.id ==client.user.id});
			if (!clientUserGuild[0].hasPermission('MANAGE_EMOJIS')) {Subaru.respond(message, "I don't have permission to set emoji's!"); return;}
			//Check if author has perms
			let userGuild = message.guild.members.array().filter(m => {return m.id == message.author.id});
			if (!userGuild[0].hasPermission('MANAGE_EMOJIS')) {Subaru.respond(message, "You don't have permission to set emoji's!"); return;}
			// CREATE
			if (args[0] == '-create') {
			if (!args[1]) {Subaru.respond(message, "No extra arguments specified :v"); return;}
			if (!args[2]) {Subaru.respond(message, "Not enough arguments specified :v"); return;}
				if (!args[2].startsWith('http://' && 'https://')) {Subaru.respond(message, "That's not a valid url!"); return;}
				message.guild.createEmoji(args[2], args[1], undefined, (args[3] ? args.slice(3).join(" ") : undefined) + " by " + message.author.username).then(x => {
				if (!x) Subaru.respond(message, "Welp, something might've gone wrong.")
				else Subaru.respond(message, 'Succes!');
				});
			}
			// ADD ROLE
			if (args[0] == '-addRole'){
			let FOOemojis = args[1].split(',');
			let FOOroles = args[2].split(',');
			let BARemojis = FOOemojis.map(x => {return message.guild.emojis.find('name', x)});
			let BARroles = FOOroles.map(x => {return message.guild.roles.find('name', x)});
			for (let i = 0; i < BARemojis.length; i++) {
				BARemojis[i].addRestrictedRoles(BARroles);
			}
			//cant check if array exists in an array so it checks for 1 role only
			if (BARemojis.map(x => {return x.roles.array().map(x => {return x.id})})[0].includes(BARroles.map(x => {return x.id})[0])) { 
			Subaru.respond(message, 'Succes!, Check ' + Subaru.config.prefix + 'emoji to verify');} else{
			Subaru.respond(message, 'I couldn\'t find all roles back, Check ' + Subaru.config.prefix + 'emoji')
			}
			}
			//REMOVE ROLE
			if (args[0] == '-removeRole'){
			let FOOemojis = args[1].split(',');
			let FOOroles = args[2].split(',');
			let BARemojis = FOOemojis.map(x => {return message.guild.emojis.find('name', x)});
			let BARroles = FOOroles.map(x => {return message.guild.roles.find('name', x)});
			for (let i = 0; i < BARemojis.length; i++) {
				BARemojis[i].removeRestrictedRoles(BARroles);
			}
			//cant check if array exists in an array so it checks for 1 role only
			if (BARemojis.map(x => {return x.roles.array().map(x => {return x.id})})[0].includes(BARroles.map(x => {return x.id})[0]) == false) { 
			Subaru.respond(message, 'Succes!, Check ' + Subaru.config.prefix + 'emoji to verify');} else{
			Subaru.respond(message, 'I couldn\'t find all roles back, Check ' + Subaru.config.prefix + 'emoji');
			}
			}
			}
		} catch (err) {
			message.channel.send('An error occured :v');
			//Subaru.error(err, message);
			//Problem here is that this command loves to create errors I can't hide so rip
		}
	}
}