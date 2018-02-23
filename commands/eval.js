module.exports = {
	name: 'eval',
	catagory: 'Admin',
	description: 'Run JS from a Discord message',
	usage: 'eval Subaru.respond(\'pizza\')',
	admin: true,
	
	run : async (Subaru, client, args, message) => {
		try {
			if (!args[0]) {Subaru.respond("No argmunets!"); return}
			Subaru.respond(message, `**input:**\n \`\`\`${args.join(" ")}\`\`\` \n **output:** \n \`\`\`${eval(args.join(" "))}\`\`\``);
			
		} catch (err) {
			message.channel.send({embed: {color: 0xff0000, title: err.toString(), description: err.stack.toString()}});
			Subaru.error(err, message);
		}
	}
}