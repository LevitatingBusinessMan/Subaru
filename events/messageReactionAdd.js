module.exports = {
	name: "messageReactionAdd",
	run : async (Subaru, client, messageReaction, author) => {
		try {
			//EmojiConfirm stuff
			if (author != client.user && (messageReaction.emoji.name == '✅' || messageReaction.emoji.name == '❌') &&
			Subaru.emojiConfirms.has(messageReaction.message.id)) {
				if (messageReaction.emoji.name == '✅') messageReaction.message.resolve(messageReaction.message);//Resolve
				if (messageReaction.emoji.name == '❌') messageReaction.message.reject(messageReaction.message);//Reject
			}
			
			//Destructor stuff
			if (author != client.user && messageReaction.emoji.name == '🗑' && Subaru.destructors.has(messageReaction.message.id)) {
				if (messageReaction.message.authorID == author.id) messageReaction.message.delete();
			}
			
		} catch (err) {
			Subaru.error(err);
		}
	}
}