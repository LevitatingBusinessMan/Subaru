module.exports = {
	name: 'udefine',
	catagory: 'Utility',
	description: 'Use urban dictionary to search for a definition',
	usage: 'udefine the batman',
	
	run : async (Subaru, client, args, message) => {
		try {
			if (!args[0]){ Subaru.respond(message, ":x: No search term specified"); return;}
			const request = require("axios");
			var result = await request.get(`https://api.urbandictionary.com/v0/define?term=${args.join("+").toString()}`);
			if (!result.data){ Subaru.respond(message, ":x: an error occured"); return;}
			if (result.data.result_type == "no_results"){ Subaru.respond(message, "No results :v"); return;}
			var f_result = result.data.list[0];
			Subaru.respond(message, {embed: {
					color: 0xff8040,
					title : `${args.join(" ")} results`,
					url: f_result.permalink,
					fields:  [{
						name: "**Definition:**",
						value: f_result.definition
					},{
						name: "**Example:**",
						value: '*' + f_result.example + '*'
					},{
						name: "**Author:**",
						value: f_result.author
					}],
					footer:{
						text: `👍${f_result.thumbs_up}|${f_result.thumbs_down}👎 www.urbandictionary.com`
					},
					timestamp: new Date()}
			});
		} catch (err) {
			Subaru.error(err, message);
		}
	}
}