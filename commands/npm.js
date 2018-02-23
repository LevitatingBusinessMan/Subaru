module.exports = {
	name: 'npm',
	catagory: 'Utility',
	description: 'Search through NPM for api\'s',
	usage: 'npm discord.js',
	
	run : async (Subaru, client, args, message) => {
		try {
			const npmSearch = require('npm-module-search');
			if (!args[0]){ Subaru.respond(message,"Specify a module kthnx"); return; }
			let msg = await message.channel.send("Retrieving data...");
			npmSearch.search(args.join(" "), {limit: 1}, async (err, module) => {
				if (err) {Subaru.log('warn', 'at: ' + message.content + '\n' + err); Subaru.respond(message,"Something went wrong :v"); return; }
				if (!module[0]) { Subaru.respond(message,"No results"); return; }
				msg.edit('', {embed:{
					url: `https://www.npmjs.com/package/${module[0].name}`,
					title: module[0].name,
					color: 0xff0000,
					fields: [{
						name: "Description:",
						value: module[0].description
					},{
						name: "Version:",
						value: module[0].version
					},{
						name: "Author:",
						value: module[0].author
					}],
					footer: {
						text: module[0].name + ' | ' + module[0].version + ' | ' + module[0].author
					}
				}});
			});
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

