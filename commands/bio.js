module.exports = {
	name: 'bio',
	catagory: 'General',
	description: 'Define a biography of yourself',
	usage: 'bio I love Emilia',
	
	run : async (Subaru, client, args, message) => {
		try {
			let user = await Subaru.USERS.get(message.author.id);
			if (!user) {Subaru.respond(message, "Something went wrong :v"); return;}
			if (!args[0]) {Subaru.respond(message, "Your bio has been reset"); user.bio = false; Subaru.USERS.set(message.author.id, user);}
			else { 
				user.bio = args.join(" "); 
				Subaru.USERS.set(message.author.id, user);
				Subaru.respond(message, "Changed your bio to \`" + args.join(" ") + '\`');
			}
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

