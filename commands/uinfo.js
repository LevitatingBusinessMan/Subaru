 module.exports = {
	name: 'uinfo',
	catagory: 'General',
	description:'Displays info about a user in an image, to get an embed use the -t argument',
	usage:'uinfo name/mention/id',
	
	run : async (Subaru, client, args, message) => {
		try {
			
			if (args.filter(x => x != '-t')[0]) var user = Subaru.getUser(args.filter(x => x != '-t')[0], message.guild.members); else var user = message.guild.members.get(message.author.id);
			if (!user) {Subaru.respond(message, 'User not found');return;}
			
			//Count mutual servers
			let mutualGuilds = 0;
			Subaru.client.guilds.map(x => x.members).forEach(x => {
				if (x.get(user.id)) mutualGuilds++;
			});
			
			//Handle guys that are not in the DB
			if (Subaru.USERS.get(user.id)) {
				var DBuser = Subaru.USERS.get(user.id);
				if (Subaru.USERS.get(user.id).profile.bio) var bio = Subaru.USERS.get(user.id).profile.bio;
			}
			
			if (args.includes('-t') || !Subaru.config.image_api)
			Subaru.respond(message, {embed:{
				title: user.user.tag + (message.guild.owner == user ? ":crown:" : ""),
				description: user.user.id,
				color: user.displayColor,
				thumbnail: {url: user.user.displayAvatarURL},
				fields:[{
					name: "Bio:",
					value: (!bio ? 'none' : bio),
					inline: (!bio ? true : false)
				},{
					name: "Points:",
					value: (!DBuser ? '0' : DBuser.points),
					inline: true,
				},{
					name: "Nickname:",
					value: (user.nickname ? user.nickname : "none"),
					inline: true
				},{
					name: "Bot:",
					value: user.user.bot,
					inline: true
				},{
					name: "Permissions:",
					value: user.permissions.bitfield,
					inline: true
				},{
					name: "mutual servers:",
					value: mutualGuilds,
					inline: true
				},{
					name: "Joined Discord:",
					value: Subaru.formatDate(user.user.createdAt, "dd/mm/yy"),
					inline: true
				},{
					name: "Joined:",
					value: Subaru.formatDate(user.joinedAt, "dd/mm/yy"),
					inline: true
				},{
					name: "Presence:",
					value: (user.presence.game ? (
							user.presence.game.type==0 ? "Playing " +  user.presence.game.name + ", " : (
							user.presence.game.type==1 ? "Streaming " +  user.presence.game.name + ", " : (
							user.presence.game.type==2 ? "Listening " +  user.presence.game.name + ", " : (
							user.presence.game.type==3 ? "Watching " +  user.presence.game.name + ", " : ''
							)))) : '') + user.presence.status,
					inline: (user.presence.game ? false : true)
				},{
					name: "Roles [" + (user.roles.array()[1] ? (user.roles.array().length - 1) : 0) + "]:",
					value: (user.roles.array()[1] ? user.roles.map(x => x.name).slice(1).join(", ") : 'none'),
				}],footer: {
					icon_url: message.author.avatarURL,
					text: message.author.username + ' | ' + message.guild.name
				},
				timestamp: new Date()
			}});
			
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}