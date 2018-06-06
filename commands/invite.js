module.exports = {
	name: 'invite',
	catagory: 'General',
	description: 'Show the invite link for this bot',
	usage:'invite',
	require: ['show_invite'],
	
	run : async (Subaru, client, args, message) => {
		try {
			Subaru.respond(message, `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`);
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}