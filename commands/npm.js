module.exports = {
	name: 'npm',
	catagory: 'Utility',
	description: 'Search through NPM for api\'s',
	usage: 'npm discord.js',
	
	run : async (Subaru, client, args, message) => {
		try {
			let request = require('axios');
			if (!args[0]){ Subaru.respond(message,"Specify a module kthnx"); return; }	
			
			request.get('https://www.npmjs.com/search/suggestions?q=' + args[0]).then(results => {				
				let module = results.data[0];
				
				if(!module) return Subaru.respond(message, 'No results');
				
				Subaru.respond(message, {embed:{
					url: module.links.npm,
					title: module.name,
					color: 0xff0000,
					fields: [{
						name: "Description:",
						value: module.description
					},{
						name: "Version:",
						value: module.version
					},{
						name: "Author:",
						value: module.author.name
					}],
					footer: {
						text: module.keywords.join(' | ')
					}
				}});
				
				}).catch(err => {
					Subaru.respond(message, 'Something went wrong :v');
					Subaru.error(err, message);
				});
				
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

