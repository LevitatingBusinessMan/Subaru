module.exports = {
	name: "resume",
	run : (Subaru, client) => {
		try {
			Subaru.log('OK', 'Websocket resumed');
		} catch (err) {
			Subaru.error(err);
		}
	}
}