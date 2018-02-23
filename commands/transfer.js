module.exports = {
	name: 'transfer',
	catagory: 'Economics',
	description: 'Give your money to someone else',
	usage: 'transfer LevitatingBusinessMan 1000',
	detailedDescription: 'Only mentions/id\s allowed\n just to make sure you don\'t give all your money to the wrong person =P',
	admin: true,
	
	run : async (Subaru, client, args, message) => {
		try {
			let author = await Subaru.USERS.get(message.author.id);
			if (!author) {Subaru.respond(message, "Something went wrong :v"); return;}
			
			if (!args[0]) {Subaru.respond(message, 'Specify a user pls');return;}
			if (!args[1]) {Subaru.respond(message, 'Specify an amount pls');return;}
			if (isNaN(args[1])) {Subaru.respond(message, "That is not a valid number!"); return;}
			
			let fooPoints = Math.round((args[1]));
			if (fooPoints < 0) {Subaru.respond(message, "No negative numbers allowed you cheeky bastard"); return;}
			
			let receiverID = args[0].replace('<@', '').replace('>','').replace('!', '');
			let receiver = Subaru.USERS.get(receiverID);
			if (!receiver) {

			//Person wasn't found in DB
			if (client.users.get(receiverID)) {
				let USERS = await Subaru.newUser(client.users.get(receiverID));
				receiver = USERS.get(receiverID);
				}
			else {Subaru.respond(message, 'That person doesn\'t exist!');return;}
			}
			
			console.log(receiver);
			
			if (author.points > fooPoints){
				author.points += -(fooPoints);
				receiver.points += fooPoints;
				//First give the receiver monies, so worst that can happen is free stuff
				Subaru.USERS.setAsync(receiver.id, receiver).then(() => {
				Subaru.USERS.setAsync(author.id, author).then(() => {
					Subaru.respond(message, {embed:{
						title: 'Transfer ' + fooPoints,
						description: `Succesfully tranferred ${fooPoints} ${author.username} > ${receiver.username}`
					}});
				}).catch(err => {
					Subaru.respond(message, "Something went wrong :v");
					Subaru.log('warn', 'At: ' + message.content + '\n' + err);
				})}).catch(err => {
					Subaru.respond(message, "Something went wrong :v");
					Subaru.log('warn', 'At: ' + message.content + '\n' + err);
				});
				
			} else {
				Subaru.respond(message, 'You don\'t have that much money !');
			}
			
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

