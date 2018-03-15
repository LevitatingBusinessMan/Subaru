 module.exports = {
	name: 'repeat',
	catagory: 'Music',
	description: 'Set the queue on repeat',
	usage:'repeat',
	
	run : async (Subaru, client, args, message) => {
		try {
		if(!message.guild.voiceConnection) {Subaru.respond(message, 'No song playing'); return;}
		if (!Subaru.voice[message.guild.name]) {Subaru.respond(message, 'No song playing'); return;}
		if (!Subaru.voice[message.guild.name].np) {Subaru.respond(message, 'No song playing'); return;}
		
		if (Subaru.voice[message.guild.name].loop == false){
			Subaru.voice[message.guild.name].loop = true;
			Subaru.respond(message, ':repeat: Toggled repeat `on`');
			return;
		}
		
		if (Subaru.voice[message.guild.name].loop == true){
			Subaru.voice[message.guild.name].loop = false;
			Subaru.respond(message, ':arrow_right:: Toggled repeat `off`');
			return;
		}
		
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}