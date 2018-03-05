module.exports = {
	name: 'qremove',
	catagory: 'Music',
	description: 'Remove a song from the queue by name or index. Use `qremove all` to clear the queue',
	usage: 'qremove rick ashley',
	
	run : async (Subaru, client, args, message) => {
		try {
		if (!args[0]) {Subaru.respond(message, 'You didn\'t specify a song!'); return;}
		if(!message.guild.voiceConnection) {Subaru.respond(message, 'There is no queue'); return;}
		if (!Subaru.voice[message.guild.name]) {Subaru.respond(message, 'There is no queue'); return;}
		if (!Subaru.voice[message.guild.name].queue[0]) {Subaru.respond(message, 'There is no queue'); return;}
		
		if (args[0] == 'all') {
			Subaru.voice[message.guild.name].queue = [];	
			Subaru.respond(message, 'Cleared queue');
		}
		else if(Subaru.voice[message.guild.name].queue[parseInt(args[0]) -1]) {
			let element = Subaru.voice[message.guild.name].queue[parseInt(args[0]) -1];
			let index = Subaru.voice[message.guild.name].queue.indexOf(element);
			Subaru.voice[message.guild.name].queue.splice(index, 1);
			Subaru.respond(message, `Removed \`${element.title}\` from queue!`);
		}
		else {
			let str_sim = require('string-similarity')
			let match = str_sim.findBestMatch(args.join(' '), Subaru.voice[message.guild.name].queue.map(x => x.title));
			if (match.bestMatch.rating < 0.3) {Subaru.respond(message, 'Didn\'t find that song'); return;}
			let element = Subaru.voice[message.guild.name].queue.filter(x => x.title == match.bestMatch.target)[0];
			let index = Subaru.voice[message.guild.name].queue.indexOf(element);
			Subaru.voice[message.guild.name].queue.splice(index, 1);
			Subaru.respond(message, `Removed \`${element.title}\` from queue!`);
		}
		
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

