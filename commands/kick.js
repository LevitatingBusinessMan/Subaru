module.exports = {
	name: 'kick',
	catagory: 'Moderation',
	description:'Kick stuff',
	usage:'kick mention/id',
	
	run : async (Subaru, client, args, message) => {
		try {
			//Check if bot has perms
			let clientUserGuild = message.guild.members.array().filter(m => {return m.id ==client.user.id});
			if (!clientUserGuild[0].hasPermission('KICK_MEMBERS')) {Subaru.respond(message, "I don't have the permission to kick people!"); return;}
			//Check if author has perms
			let author = message.guild.members.array().filter(m => {return m.id == message.author.id});
			if (!author[0].hasPermission('KICK_MEMBERS')) {Subaru.respond(message, "You don't have the permission to kick people!"); return;}
			if (!args[0]) {Subaru.respond(message, "Specify somebody to kick pls"); return;}
			let user = message.guild.members.get(args[0].replace('<@', '').replace('!', '').replace('>', ''));
			if (!user.kickable) {Subaru.respond(message, "You can't kick this user!"); return;}
			if (!user) {Subaru.respond(message, "That is not a member!"); return;}
			//Time to kick :3
			user.kick(args.slice(1).join(" ") + " by " + author[0].user.tag).then(foo => {
			if (message.guild.members.array().filter(x => x.id == user.id)[0]) Subaru.respond(message, "Something might've gone wrong :v");
			else Subaru.respond(message, "Succes!");
			});
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}