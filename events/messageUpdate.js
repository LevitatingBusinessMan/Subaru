module.exports = {
	name: "messageUpdate",
	run : async (Subaru, client, OldMessage, NewMessage) => {
		try {
			if(Subaru.editMessages.has(NewMessage.id)){
				let channel_messages = await NewMessage.channel.fetchMessages();
				let last_msg = channel_messages.array().sort((a,b) => b.createdTimestamp - a.createdTimestamp)[0];
				if (Subaru.editMessages.has(last_msg.id)) require('./message.js').run(Subaru, client, NewMessage);
			}
		} catch (err) {
			Subaru.error(err);
		}
	}
}