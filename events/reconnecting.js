module.exports = {
	name: "reconnecting",
	run : async (Subaru, client) => {
		try {
			Subaru.log('warn', "Reconnecting to websocket");
		} catch (err) {
			Subaru.error(err);
		}
	}
}