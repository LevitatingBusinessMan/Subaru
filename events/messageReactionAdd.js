module.exports = {
	name: "messageReactionAdd",
	run : async (Subaru, client, messageReaction, author) => {
		try {
			
			//Destructor stuff
			if (author == client.user || messageReaction.emoji.name != '🗑') return;
			if (Subaru.destructors.get(messageReaction.message.id)) { //If the message is registered as destructor
				if (messageReaction.message.authorID == author.id) messageReaction.message.delete();
			}
			
		} catch (err) {
			Subaru.error(err);
		}
	}
}