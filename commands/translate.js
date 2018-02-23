module.exports = {
	name: 'translate',
	catagory: 'Utility',
	description:'Translate stuff',
	usage:'translate kaas nl:en',
	detailedDescription: '\`prefix.translate kaas **:en\` will try to recognize the origin language \nAlso only 2 char ISO\'s supported',
	
	run : async (Subaru, client, args, message) => {
		try {
			const trans = require('google-translate-api');
			if (!args[0]){ Subaru.respond(message, ":x: No arguments"); return;}
			if (!getLang(args[0]) && !getLang(args[args.length - 1])){ Subaru.respond(message, "Please include languages. Ex: \`en:nl\` at the end"); return;}
			var from;
			var to;
			
			if (getLang(args[0])) {var langs = getLang(args[0]); args.shift();}
			if (getLang(args[args.length - 1])) {var langs = getLang(args[args.length - 1]); args.pop();}
			
			trans(args.join(" "), (from ? {from: from, to: to} : {to: to})).then(res => {
				Subaru.respond(message, {embed:{
					title: 'Translate ' + res.from.language.iso + ':' + to,
					description: res.text
				}});
			}).catch(err => {
				Subaru.respond(message, err.toString());
			});
			
			function getLang(arg) {
				if (arg.length != 5 || !arg.includes(':')) return false;
				if (arg.substr(0, 2) != '**') from = arg.substr(0, 2);
				to = arg.substr(3, 2);
				return true;
			}

		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}