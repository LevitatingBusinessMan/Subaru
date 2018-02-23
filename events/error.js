// Let's see if this actually does anything ¯\_(ツ)_/¯

module.exports = {
	name: "error",
	run : (Subaru, client, error) => {
		try {
			Subaru.log('err', error.error.message);
		} catch (err) {
			Subaru.error(err);
		}
	}
}