module.exports = {
	name: 'cat',
	catagory: 'Image',
	description: 'Get cat pictures',
	usage: 'cat',
	require : ["CatAPI"],
	
	run : async (Subaru, client, args, message) => {
		try {
			const APIkey = Subaru.config.CatAPI;
			const request = require("axios");
			let result = await request.get(`http://thecatapi.com/api/images/get?api_key=${APIkey}&format=xml&results_per_page=1&sub_id=${message.author.id}`);
			if (result.status != 200 || !result.data) { Subaru.respond(message,"Something went wrong :v"); return; }
			let url = result.data.substr(result.data.indexOf('<url>') + 5, (result.data.indexOf('</url>') - result.data.indexOf('<url>') - 5));
			let source = result.data.substr(result.data.indexOf('<source_url>') + 12, (result.data.indexOf('</source_url>') - result.data.indexOf('<source_url>') - 12));
			Subaru.respond(message, {embed:{
				image: {url: url},
				footer: {text: "Powered by the CatAPI | " + source}
			}});
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

