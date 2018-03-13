module.exports = {
	name: 'guildSettings',
	catagory: 'Moderation',
	description:'Show the guild settings of this server',
	usage:'guildSettings',
	
	run : async (Subaru, client, args, message) => {
		try {
			
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}