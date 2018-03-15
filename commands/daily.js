module.exports = {
	name: 'daily',
	catagory: 'Economics',
	description: 'Receive your daily 500 points',
	usage: 'daily',
	
	run : async (Subaru, client, args, message) => {
		try {
			let user = await Subaru.USERS.get(message.author.id);
			if (!user) {Subaru.respond(message, "Something went wrong :v"); return;}
			if (user.daily < new Date() || !user.daily){
				var bonus = false;
			
				//DBL is linked
				if (Subaru.dbl) {
					let voted = await Subaru.dbl.hasVoted(message.author.id)
					if (voted) {
						user.points += 750;
						bonus = true;
					} 
					else user.points += 500;
				} else user.points += 500;
				
				user.daily =  new Date().getTime() + 12*60*60*1000;
				
				Subaru.USERS.setAsync(user.id, user).then(() => {
					Subaru.respond(message, bonus ? 
					"**750** daily points received *(250 for voting)*" :
					"**500** daily points received")});
			} else {
				let time = Subaru.formatDate(new Date(user.daily), 'hh:mi');
				Subaru.respond(message, "Please wait untill **" + time + (time.substr(0,2) > 12 ? ' pm' : ' am') +'** before using daily again');
			}
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

