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
				user.points += 500;
				user.daily =  new Date().getTime() + 12*60*60*1000;
				Subaru.USERS.setAsync(user.id, user).then(() => {
					Subaru.respond(message, "**500** points have been added to your account")}).catch(err => {
					Subaru.respond(message, "Something went wrong :v");
					Subaru.log('warn', 'At: ' + message.content + '\n' + err)});
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

