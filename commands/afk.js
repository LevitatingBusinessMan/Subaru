module.exports = {
	name: 'afk',
	catagory: 'General',
	description: 'Set a message for everyone to see that mentions you',
	usage: 'afk watching anime',
	
	run : async (Subaru, client, args, message) => {
		try {
			let user = await Subaru.USERS.get(message.author.id);
			if (!user) {Subaru.respond(message, "Something went wrong :v"); return;}
			if (!args[0]) {Subaru.respond(message, "Removed AFK message"); user.afk = false; Subaru.USERS.set(message.author.id, user);}
			else { 
				user.afk = args.join(" "); 
				Subaru.USERS.set(message.author.id, user);
				Subaru.respond(message, "You are now AFK with message \`" + args.join(" ") + '\`');
			}
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

