module.exports = {
	name: 'iam',
	catagory: 'General',
	description: 'Assign an autorole to yourself or manage autoroles',
	usage: 'iam gay',
	detailedDescription: `\`prefix.iam -add [role]\` to add an autorole to the server (requires manage_roles perm)
\`prefix.iam -remove [role]\` to remove an autorole to the server (requires manage_roles perm)
\`prefix.iam -iamnot [role]\` to remove an autorole from yourself`,
	
	run : async (Subaru, client, args, message) => {
		try {
			
			let 
				authority = message.member.hasPermission('MANAGE_ROLES'),
				guild = Subaru.GUILDS.get(message.guild.id);
			
			//Check if bot has perms
			let clientUserGuild = message.guild.members.array().filter(m => {return m.id ==client.user.id});
			if (!clientUserGuild[0].hasPermission('MANAGE_ROLES')) return Subaru.respond(message, "I don't have the permission to kick manage roles!!");
			
			//Show roles
			if (!args[0]) {
				if (guild.autoroles === false || guild.autoroles.length === 0) return Subaru.respond(message, "This server doesn't have any autoroles");
				Subaru.respond(message, "Autoroles: " + guild.autoroles.join(', '));
			}
			
			//Add role to server
			else if (args[0] == '-add') {
				if (!authority) return Subaru.respond(message, 'You don\'t have the manage_roles permission!');
				if (!args[1]) return Subaru.respond(message, 'You didn\'t specify a role');
				
				let role =  message.guild.roles.find('name', args[1]);
				if (!role) return Subaru.respond(message, 'That is not a role!');
				
				if (!guild.autoroles.length) guild.autoroles = [];
				
				if (guild.autoroles.includes(role.name)) return Subaru.respond(message, "That role is already an autorole!");
				else guild.autoroles.push(role.name);
				
				Subaru.GUILDS.setAsync(guild.id, guild).then(() => Subaru.respond(message, "Added **" + role.name + "** to autoroles"));
			}
			
			//Remove role from server
			else if (args[0] == '-remove') {
				if (!authority) return Subaru.respond(message, 'You don\'t have the manage_roles permission! Maybe you were looking for `iam -iamnot`?');
				
				let role =  message.guild.roles.find('name', args[1]);
				if (!role) return Subaru.respond(message, 'That is not a role!');
				
				if (!args[1]) return Subaru.respond(message, 'You didn\'t specify a role');
				
				if(!guild.autoroles.includes(args[1])) return Subaru.respond(message, 'That is not an autorole!');
				
				guild.autoroles.splice(guild.autoroles.indexOf(args[1]));
				Subaru.GUILDS.set(guild.id, guild);
				Subaru.respond(message, "Removed **" + role.name + "** from autoroles");
			}

			//Assign or remove role
			else {
				
				var iamnot = (args[0] == '-iamnot');
				
				if (guild.autoroles === false) return Subaru.respond(message, "This server doesn't have any autoroles");
				
				let role =  message.guild.roles.find('name', iamnot ? args[1] : args[0]);
				if (!role) return Subaru.respond(message, 'That is not a role!');
				if(!guild.autoroles.includes(iamnot ? args[1] : args[0])) return Subaru.respond(message, 'That is not an autorole!');
				
				if (iamnot) {
					if (!message.member.roles.get(role.id)) return Subaru.respond(message, 'You don\'t have that role!');
				} else {
					if (message.member.roles.get(role.id)) return Subaru.respond(message, 'You already have that role!');

				}
				/*
					First lets send an embed with info about being mentionable, hoisting, color(in the embed) and stuff.
					Then do an emojiConfirm
				*/
				
				let msg = await Subaru.respond(message, {embed:{
					title: (iamnot ? 'Remove ' : 'Add ') + role.name + '?',
					color: role.color,
					fields: [{name:'Seperated members list',
					value: role.hoist ?':white_check_mark:':':x:'},
					{name:'Mentionable',
					value: role.mentionable ?':white_check_mark:':':x:'}]
				}});
				
				msg.addConfirm(message.author.id).then(msg => {
					
						if (iamnot) 
							message.member.removeRole(role, "autorole").then(() => 
								msg.edit("Removed")
							).catch(err => Subaru.respond(message, "I dont have the permission to remove that role"));
						
						else message.member.addRole(role, "autorole").then(() => 
								msg.edit("Added")
						).catch(err => Subaru.respond(message, "I dont have the permission to add that role"));
						
					}).catch(msg => {
						msg.edit('Cancelled')
					});
				
				/*
				if (iamnot) 
					message.member.removeRole(role, "autorole").then(() => 
						Subaru.respond(message, "Removed **" + role.name + "** from you!")
					).catch(err => Subaru.respond(message, "I dont have the permission to add that role"));
				
				else message.member.addRole(role, "autorole").then(() => 
					Subaru.respond(message, "Added **" + role.name + "** to you!")
				).catch(err => Subaru.respond(message, "I dont have the permission to remove that role"));
				*/
			}
			
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

