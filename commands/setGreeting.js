 module.exports = {
	name: 'setGreeting',
	catagory: 'Moderation',
	description:'Set a message to diplay when someone joins the server',
	usage:'setGreeting Welcome %user% to %guild%!',
	detailedDescription: 
`Use these replacements:
\`%user%\`: The username without tags or mention;
\`%user-tag%\`: The username with tags;
\`%user-mention%\`: The username as a mention;
\`%guild%\`: The guild/servers name;

To remove a greeting, \`prefix.setGreeting -remove\`
To set the channel, \`prefix.setGreeting -channel channelname\`
`,
	
	run : async (Subaru, client, args, message) => {
		try {
			
			//Show current
			if (!args[0]) {
				let guild = Subaru.GUILDS.get(message.guild.id);
				
				if (message.guild.channels.get(guild.greetingChannel)) var channel = `<#${message.guild.channels.get(guild.greetingChannel).id}>`;
				else var channel = 'none';
				
				Subaru.respond(message, {embed: {
					title: message.guild.name + ' message examples',
					fields: [{
						name: 'Greeting:',
						value: !guild.greeting ? 'none' : guild.greeting
						.replace('%user&', message.author.username)
						.replace('%user-tag%', message.author.tag)
						.replace('%user-mention%', `<@${message.author.id}>`)
						.replace('%guild%', message.guild.name)
					},{
						name: 'Farewell:',
						value: !guild.farewell ? 'none' : guild.farewell
						.replace('%user&', message.author.username)
						.replace('%user-tag%', message.author.tag)
						.replace('%user-mention%', `<@${message.author.id}>`)
						.replace('%guild%', message.guild.name)
					},{
						name: 'Channel:',
						value: channel
					}],
					footer: {
						text: `Use \`${Subaru.config.prefix}setFarewell\` to set a farewell`
					}
				}});
			} 
			
			else {
				let author = message.guild.members.get(message.author.id);
				if (!author.hasPermission('MANAGE_GUILD')) {Subaru.respond(message, "You don't have the **manage server** permission!"); return;}
				
				//remove
				if (args[0] == '-remove'){
					let confirm_msg = await Subaru.respond(message, 'Are you sure you want to remove the greeting?');
					confirm_msg.addConfirm(message.author.id).then(msg => {
						let guild = Subaru.GUILDS.get(message.guild.id);
						guild.greeting = false;
						Subaru.GUILDS.set(guild.id, guild);
						msg.edit('Greeting message has been removed');
					}).catch(msg => {
						msg.edit('Cancelled');
					});
				} else
				
				//Set channel
				if (args[0] == '-channel'){
					if (!args[1]) {Subaru.respond(message, 'Please specify a channel'); return}
					if (args[1].startsWith('<#')) var channel = message.guild.channels.get(args[1].between('<#', '>'));
					else var channel = message.guild.channels.find(x=> x.name == args[1]);
					if (!channel) Subaru.respond(message, 'That channel doesn\'t exist!');
					else {
						let guild = Subaru.GUILDS.get(message.guild.id);
						guild.greetingChannel = channel.id;
						Subaru.GUILDS.set(guild.id, guild);
						Subaru.respond(message, `Channel \`${channel.name}\` has been set for greetings/farewells`);
					}
				}
				
				//Set message
				else {
					let guild = Subaru.GUILDS.get(message.guild.id);
					if (!guild.greetingChannel){
						Subaru.respond(message, `First set a channel with \`${Subaru.config.prefix}setGreeting -channel channelname\``);
						return;
					}
					let preview = args.join(' ')
					.replace('%user&', message.author.username)
					.replace('%user-tag%', message.author.tag)
					.replace('%user-mention%', `<@${message.author.id}>`)
					.replace('%guild%', message.guild.name);
					
					let preview_msg = await Subaru.respond(message, {embed: {
						title: 'Preview:',
						description: preview,
						footer: {text: 'Are you sure you want to set this as a greeting?'}
					}})
					preview_msg.addConfirm(message.author.id).then(msg => {
						guild.greeting = args.join(' ');
						Subaru.GUILDS.set(guild.id, guild);
						msg.edit(`I have set \`${args.join(' ')}\` as a greeting`, {embed:null});
					}).catch(msg => msg.edit('Cancelled', {embed:null}));
					
				}
			}
			
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}