const request = require('axios');

module.exports = {
	name: 'mdn',
	catagory: 'Utility',
	description:'Search through MDN',
	usage:'mdn',
	
	run : async (Subaru, client, args, message) => {
		try {
			
				if (!args[0]) Subaru.respond(message, 'Please specify an argument');
				else {
					let results = await request.get(`https://developer.mozilla.org/en-US/search?locale=en-US&q=${args.join('+')}`);
					if (results.status != 200){Subaru.respond(message, 'Something went wrong retrieving the data :v'); return;}
					let docs = results.data.documents;
					if (!docs[0]) Subaru.respond(message, 'no results :v');
					else Subaru.respond(message, {embed:{
						thumbnail: {url:'https://cdn.mdn.mozilla.net/static/img/favicon144.e7e21ca263ca.png'},
						url: docs[0].url,
						title: docs[0].title,
						color: 0x0066ff,
						description: docs[0].excerpt,
						footer: {
							icon_url: 'https://cdn.mdn.mozilla.net/static/img/favicon144.e7e21ca263ca.png',
							text: `https://developer.mozilla.org/en-US/search?q=${args.join('+')}`
						}
					}});
				}
				
			} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}