// Let's see if this actually does anything ¯\_(ツ)_/¯

module.exports = {
	name: "warn",
	run : (Subaru, client, info) => {
		try {
			Subaru.log('warn', info);
		} catch (err) {
			Subaru.error(err, message);
		}
	}
}