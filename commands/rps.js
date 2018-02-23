module.exports = {
	name: 'rps',
	catagory: 'Economics',
	description: 'Rock, Paper, Scissors',
	usage: 'rps rock 100',
	
	run : async (Subaru, client, args, message) => {
		try {
			let user = await Subaru.USERS.get(message.author.id);
			if (!user) {Subaru.respond(message, "Something went wrong :v"); return;}
			if (!args[0]) {Subaru.respond(message, "No arguments specified :v"); return;}
			let Uchoice = args[0].toLowerCase();
			if (Uchoice != 'rock' && Uchoice != 'paper' && Uchoice != 'scissors') {Subaru.respond(message, "That is not a valid option"); return;}
			let foo = Math.floor(Math.random()*3);
			let Bchoice = (foo == 1 ? 'rock' : (foo == 2 ? 'paper' : 'scissors'));
			
			if (Bchoice == 'rock' && Uchoice == 'paper') Uwon = true;
			if (Bchoice == 'rock' && Uchoice == 'scissors') Uwon = false;
			if (Bchoice == 'paper' && Uchoice == 'scissors') Uwon = true;
			if (Bchoice == 'paper' && Uchoice == 'rock') Uwon = false;
			if (Bchoice == 'scissors' && Uchoice == 'rock') Uwon = true;
			if (Bchoice == 'scissors' && Uchoice == 'paper') Uwon = false;
			
			if (!args[1]){//No points specified
				if (Uchoice == Bchoice) {Subaru.respond(message, `I choose **${Bchoice}**. It's a tie!`); return;}
				if (Uwon) Subaru.respond(message, `I choose **${Bchoice}**. You won!`);
				else Subaru.respond(message, `I choose **${Bchoice}**. You lost!`);
			} else {
				if (isNaN(args[1])) {Subaru.respond(message, "That is not a valid number!"); return;} //Second args isn't a number
				let fooPoints = Math.round((args[1]));
				if (fooPoints < 0) {Subaru.respond(message, "Ye we're not doing that again"); return;}
				if (fooPoints > user.points) {Subaru.respond(message, "You don't have that many points!"); return;}
				if (Uchoice == Bchoice) {Subaru.respond(message, `I choose **${Bchoice}**. It's a tie!`); return;}
				if (Uwon) {
					Subaru.respond(message, `I choose **${Bchoice}**. You won ${fooPoints}!`);
					user.points += fooPoints;
				} else {
					Subaru.respond(message, `I choose **${Bchoice}**. You lose ${fooPoints}!`);
					user.points += -(fooPoints);
				}
				Subaru.USERS.setAsync(user.id, user).catch(err => {
					Subaru.respond(message, "Something went wrong changing your balance :v");
					Subaru.log('warn', 'At: ' + message.content + '\n' + err)});
			}
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

