module.exports = {
	name: '8ball',
	catagory: 'Fun',
	description:'Ask the 8ball',
	usage:'8ball',
	
	run : async (Subaru, client, args, message) => {
		try {
			let answers = ['no','yes','maybe','obviously','depends','I say yes','Of course not',
			'Maybe in another universe','Not today','pizza','yes of course','always'];
			
			Subaru.respond(message, {embed:{
				title: ':8ball: 8 ball',
				description: '`' + answers[Math.floor(Math.random()*answers.length)+1] + '`'
			}});
		
			} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}