module.exports = {
	name: 'qremove',
	catagory: 'Music',
	description: 'Remove a song from the queue',
	usage: 'qremove [link]',
	
	run : async (Subaru, client, args, message) => {
		try {
		if (!args[0]) {Subaru.respond(message, 'You didn\'t specify a song!'); return;}
		if(!message.guild.voiceConnection) {Subaru.respond(message, 'There is no queue'); return;}
		if (!Subaru.voice[message.guild.name]) {Subaru.respond(message, 'There is no queue'); return;}
		
		let queueElement = Subaru.voice[message.guild.name].queue.filter(x => x.url == args[0])[0];
		
		if (queueElement){
			let index = Subaru.voice[message.guild.name].queue.indexOf(queueElement);
			Subaru.voice[message.guild.name].queue.splice(index, 1);
			Subaru.respond(message, `Removed \`${queueElement.title}\` from the queue`);
		} else Subaru.respond(message, 'Didn\'t find that song in the queue');
		
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

