module.exports = {
	name: 'iam',
	catagory: 'General',
	description: 'Assign an autorole to yourself',
	usage: 'iam gay',
	detailedDescription: `\`prefix.iam -add [role]\` to add an autorole to the server(admin)
\`prefix.iam -remove [role]\` to remove an autorole to the server (admin)
\`prefix.iam -iamnot [role]\` to remove an autorole from yourself`,
	
	run : async (Subaru, client, args, message) => {
		try {
			let clientUserGuild = message.guild.members.array().filter(m => {return m.id ==client.user.id});
			if (!clientUserGuild[0].hasPermission('MANAGE_ROLES')) {Subaru.respond(message, "I don't have the permission to manage roles!"); return;}
			let guild = Subaru.GUILDS.get(message.guild.id);
			if (!guild) {Subaru.respond(message, "Something went wrong :v"); return;}
			
			if (!args[0]) {
				if (guild.autoroles.length === 0) {Subaru.respond(message, "This server doesn't have any autoroles"); return;}
				Subaru.respond(message, "Autoroles: " + guild.autoroles.join(', '));
				
			} else if (args[0] == '-add'){
				let author = message.guild.members.array().filter(m => {return m.id == message.author.id});
				if (!author[0].hasPermission('ADMINISTRATOR')) {Subaru.respond(message, "You don't have the administator permission!"); return;}
				if (!args[1]) {Subaru.respond(message, "No role specified :v"); return;}
				let role = message.guild.roles.find('name', args[1]);
				if (!role) {Subaru.respond(message, "That is not a role!"); return;}
				
				if (guild.autoroles.includes(role.name)) {Subaru.respond(message, "That role is already an autorole!"); return;}
				guild.autoroles.push(role.name);
				Subaru.GUILDS.setAsync(guild.id, guild).then(() => Subaru.respond(message, "Added **" + role.name + "** to autoroles"))
				
			} else if (args[0] == '-remove') {
				let author = message.guild.members.array().filter(m => {return m.id == message.author.id});
				if (!author[0].hasPermission('ADMINISTRATOR')) {Subaru.respond(message, "You don't have the administator permission!"); return;}
				if (!args[1]) {Subaru.respond(message, "No role specified :v"); return;}
				
				if (!guild.autoroles.includes(args[1])) {Subaru.respond(message, "That is not an autorole!"); return;}
				guild.autoroles.splice(guild.autoroles.indexOf(args[1]));
				Subaru.GUILDS.setAsync(guild.id, guild).then(() => Subaru.respond(message, "Removed **" + role.name + "** from autoroles"))
			} else {
				if (guild.autoroles.length === 0) {Subaru.respond(message, "This server doesn't have any autoroles!"); return;}
				let role = message.guild.roles.find('name', (args[0] == '-iamnot' ? args[1] : args[0]));
				if (!role) {Subaru.respond(message, "That is not a role!"); return;}
				//check second arg if this is an iam not 
				if (!guild.autoroles.includes(((args[0] == '-iamnot' ? args[1] : args[0])))) {Subaru.respond(message, "That role is not an autorole!"); return;}
			
				let user = message.guild.members.find('id', message.author.id);
				if (!user) {Subaru.respond(message, "Something went wrong :v"); return;}
				if (args[0] == '-iamnot') user.removeRole(role, "autorole").then(() => {
					Subaru.respond(message, "Removed **" + role.name + "** from you!");
				}).catch(err => Subaru.respond(message, "I dont have the permission to add that role"));
				else user.addRole(role, "autorole").then(() => {
					Subaru.respond(message, "Added **" + role.name + "** to you!");
				}).catch(err => Subaru.respond(message, "I dont have the permission to add that role"));
			}
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

