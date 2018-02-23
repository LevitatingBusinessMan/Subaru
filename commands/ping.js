module.exports = {
	name: 'ping',
	catagory: 'General',
	description:'Shows the bots ping',
	usage:'ping',
	
	run : async (Subaru, client, args, message) => {
		try {
			let msg = await message.channel.send(":stopwatch: wasting time");
			msg.edit(`Ping: \`${msg.createdTimestamp - message.createdTimestamp}\` ms`);
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}