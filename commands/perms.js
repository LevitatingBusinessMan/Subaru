module.exports = {
	name: 'perms',
	catagory: 'General',
	description:'Display all permissions for a single user',
	usage:'perms name/mention/id',
	
	run : async (Subaru, client, args, message) => {
		try {
			if (args[0]) var user = Subaru.getUser(args[0], message.guild.members); else var user = message.guild.members.get(message.author.id);
			if (!user) {Subaru.respond(message,'User not found'); return;}
			let embed = {
				title: user.user.tag + (message.guild.owner == user ? ":crown:" : ""),
				description: "Bitfield: " + user.permissions.bitfield,
				color: user.displayColor,
				thumbnail: {url:user.user.avatarURL},
				fields:[]
			};
			let embed2 = {
				color: user.displayColor,
				fields: [],
				footer: {
					icon_url: message.author.avatarURL,
					text: message.author.username + ' | ' + message.guild.name
				},
				timestamp: new Date()
			};
			let permissions = user.permissions.serialize();
			let i = 0;
			 for (let property in permissions){
				let field = {name: property.toLowerCase(), value:permissions[property], inline: true}
				if (i < 25) embed.fields.push(field); else embed2.fields.push(field);
				i++;
			}
			Subaru.respond(message, {embed}).then(x => x.addDestructor(message.author.id));
			Subaru.respond(message, {embed: embed2}).then(x => x.addDestructor(message.author.id));
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}