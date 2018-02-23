module.exports = {
	name: 'baguette',
	catagory: 'Fun',
	description: 'A baguette is a long, thin loaf of French bread that is commonly made from basic lean dough. It is distinguishable by its length and crisp crust.',
	usage:'baguette',
	
	run : async (Subaru, client, args, message) => {
		try {
			Subaru.respond(message, ":french_bread:");
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}