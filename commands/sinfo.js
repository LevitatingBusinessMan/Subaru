module.exports = {
	name: 'sinfo',
	catagory: 'General',
	description:'Shows some juicy info about the server',
	usage:'sinfo',
	
	run : async (Subaru, client, args, message) => {
		try {
			var g = message.guild;
			message.channel.send({embed:{
				title: g.name,
				thumbnail: {url: g.iconURL},
				fields: [{
					name: 'Owner',
					value: g.owner.displayName + ' :crown:',
					inline: false
				},{
					name: 'Members:',
					value: g.members.array().length,
					inline: true,
				},{
					name: 'Channels:',
					value: g.channels.array().length,
					inline: true
				},{
					name: 'Bots:',
					value: g.members.array().filter(x => x.user.bot).length,
					inline: true
				},{
					name: 'Roles:',
					value: g.roles.array().length,
					inline: true
				},{
					name: 'Emoji\'s:',
					value: g.emojis.array().length,
					inline: true
				},{
					name: 'Verification:',
					value: (g.verificationLevel==0?"none":
					(g.verificationLevel==1?"low":
					(g.verificationLevel==2?"medium":
					(g.verificationLevel==3?"(╯°□°）╯︵ ┻━┻":"┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻")))),
					inline: true
				},{
					name: 'Region:',
					value: g.region,
					inline: true
				}],
				footer :{
					icon_url: g.owner.user.avatarURL,
				text: `${g.owner.displayName} | ${g.name} | Guild created:`
				}, timestamp: g.createdAt
				}});
				
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}