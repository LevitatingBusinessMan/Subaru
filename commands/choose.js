module.exports = {
	name: 'choose',
	catagory: 'Fun',
	description: 'Choose between multiple options',
	usage:'choose Rem ; Emilia',
	
	run : async (Subaru, client, args, message) => {
		try {
			if (!args[0]) {Subaru.respond(message, "No arguments :v"); return;}
			if (!args.join("").includes(";")) {Subaru.respond(message, `Options must be seperated by a \`;\` . See ${Subaru.config.prefix}help choose `); return;}
			else var choose = args.join(" ").split(";").filter(x => x && x != " ");
			Subaru.respond(message,`I choose \`${choose[Math.floor(Math.random()*(choose.length))].trim()}\`!`);
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}