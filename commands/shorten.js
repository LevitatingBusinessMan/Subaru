module.exports = {
	name: 'shorten',
	catagory: 'Utility',
	description: 'Takes a URL as input, and shortens it',
	usage:'shorten https://github.com bit.ly',
	detailedDescription : `\`prefix.shorten https://google.com goo.gl\` will create a goo.gl link
\`prefix.shorten https://google.com bit.ly\` will create a bit.ly link.
\`prefix.shorten https://goo.gl/SsAhv -unshorten\` will unshorten the link.`,
	require : ["bitlyApiKey", "bitlyApiLogin" , "googleShortenerApiKey"],
	
	run : async (Subaru, client, args, message) => {
		try {
			if (!args[0]) { Subaru.respond(message, "Specify a url to shorten kthnx"); return; };
			const request = require("axios");
			
			if (!args.includes("-unshorten")){
				if (args[1] == "goo.gl" || !args[1]){
					const key = Subaru.config.googleShortenerApiKey;
					var result = await request.post(`https://www.googleapis.com/urlshortener/v1/url?key=${key}`, {"longUrl": args[0]}	, {'Content-Type': 'application/json'});
					if (!result.data) { Subaru.respond(message, ":x: An error occurred :v"); return; };
					Subaru.respond(message, embedResults(result.data.longUrl, result.data.id));
				} else if (args[1] == "bit.ly"){
					const key = Subaru.config.bitlyApiKey;
					const login = Subaru.config.bitlyApiLogin;
					var result = await request.get(`https://api-ssl.bitly.com/v3/shorten?login=${login}&apiKey=${key}&longUrl=${args[0]}`);
					if (!result.data) { Subaru.respond(message, ":x: An error occurred :v"); return; };
					Subaru.respond(message, embedResults(result.data.data.long_url, result.data.data.url));
				}
			} else {
				if (args[0].includes("bit.ly")) {
					const key = Subaru.config.bitlyApiKey;
					var result = await request.get(`https://api-ssl.bitly.com/v3/expand?login=${key[0]}&apiKey=${key[1]}&shortUrl=${args[0]}`);
					console.log(result.data.data.expand[0].long_url);
					if (!result.data) { Subaru.respond(message, ":x: An error occurred :v"); return; };
					Subaru.respond(message, embedResults(result.data.data.expand[0].short_url, result.data.data.expand[0].long_url));
				} else if (args[0].includes("goo.gl")) {
					const key = Subaru.config.googleShortenerApiKey;
					var result = await request.get(`https://www.googleapis.com/urlshortener/v1/url?key=${key}&shortUrl=${args[0]}`);
					if (!result.data) { Subaru.respond(message, ":x: An error occurred :v"); return; };
					Subaru.respond(message, embedResults(result.data.id, result.data.longUrl));
				} else { Subaru.respond(message, ":x: Only `bit.ly` and `goo.gl` allowed!"); return; };
			}
			function embedResults(new_url, old_url){
					return {embed: {
					title : ":link: Shorten results",
					fields:  [{
						name: "**Old:**",
						value: new_url
					},{
						name: "**New:**",
						value: old_url
					}],
					timestamp: new Date()}
			}}		
			} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}