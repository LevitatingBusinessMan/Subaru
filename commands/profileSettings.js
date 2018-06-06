 module.exports = {
	name: 'profileSettings',
	catagory: 'General',
	description:'Display/Edit user settings and profile page',
	detailedDescription: `Arguments:
\`prefix.profileSettings -bg default\` change backgrounds to "default". See prefix.backgrounds
\`prefix.profileSettings -border_color fff\` to change the border-color to \`fff\` (white)
\`prefix.profileSettings -text_color 000\` to change the text-color to \`000\` (black)
\`prefix.profileSettings -bio I am a crazy person\` to change your bio (black)
`,
usage:'profileSettings',
require : ["image_api"],
	
	run : async (Subaru, client, args, message) => {
		try {
			
			let user = await Subaru.USERS.get(message.author.id);
			let hexRegEx = /([0-9A-F]{6}$)|([0-9A-F]{3}$)/i;
			
			if (!args[0]) {
				Subaru.respond(message, {embed:{
					title: 'Profile settings',
					fields: [{
						name: 'Background:',
						value: '`' + user.profile.bg + '`'
					},{
						name: 'Border color:',
						value: '#`' + user.profile.border_color + '`'
					},{
						name: 'Text color:',
						value: '#`' + user.profile.text_color + '`'
					},{
						name: 'Bio:',
						value: '`' + user.profile.bio + '`'
					}],
					footer: {
						text: `To edit, check \`${Subaru.config.prefix}help profileSettings\` and \`${Subaru.config.prefix}backgrounds\``
					}
				}});
			}
			
			//BACKGROUND
			else if (args[0] == '-bg') {
				if (!args[1]) return Subaru.respond(message, 'Please specify a value!');

				let request = require('axios');
				
				Subaru.respond(message, 'Your new background:', {file: `http://localhost:3000/assets/backgrounds/${args[1]}.jpg`})
				.then(() => {
					user.profile.bg = args[1];
					Subaru.USERS.set(user.id, user);
				})
				.catch(err => {
					Subaru.respond(message, `That is not a background, please see \`${Subaru.config.prefix}backgrounds\``);
				});
			}
			
			//text_color
			else if (args[0] == '-text_color') {
				if (!args[1]) return Subaru.respond(message, 'Please specify a value!');
				
				if (hexRegEx.test(args[1])) {
					user.profile.text_color = args[1];
					Subaru.USERS.set(user.id, user);
					Subaru.respond(message, `Your text_color has been changed to \`${args[1]}\``);
				} else {
					Subaru.respond(message, 'The value must be a hex color excluding the \`#\`')
				}
			}
			
			//border_color
			else if (args[0] == '-border_color') {
				if (!args[1]) return Subaru.respond(message, 'Please specify a value!');

				if (hexRegEx.test(args[1])) {
					user.profile.border_color = args[1];
					Subaru.USERS.set(user.id, user);
					Subaru.respond(message, `Your border_color has been changed to \`${args[1]}\``);
				} else {
					Subaru.respond(message, 'The value must be a hex color excluding the \`#\`')
				}
			}
			
			//Bio
			else if (args[0] == '-bio') {
				if (!args[1]) {
					user.profile.bio = false; 
					Subaru.USERS.set(message.author.id, user);
					Subaru.respond(message, 'Your bio has been reset');
				} else {
					args.splice(0,1);
					user.profile.bio = args.join(" "); 
					Subaru.USERS.set(message.author.id, user);
					Subaru.respond(message, "Changed your bio to \`" + args.join(" ") + '\`');
				}

			}

		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
 }