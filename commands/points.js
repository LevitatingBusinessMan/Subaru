module.exports = {
	name: 'points',
	catagory: 'Economics',
	description: 'Displays your points',
	usage: 'points',
	
	run : async (Subaru, client, args, message) => {
		try {
			let user = await Subaru.USERS.get(message.author.id);
			if (!user) {Subaru.respond(message, "Something went wrong :v"); return;}
			Subaru.respond(message, 'You have **' + user.points + '** points');
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

