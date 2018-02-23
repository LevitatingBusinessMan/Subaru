module.exports = async (client) => {
	const request = require("axios");
	request.get('https://nekos.life/api/v2/cat').then(x => client.user.setActivity(x.data.cat))
	setInterval(() => {
		request.get('https://nekos.life/api/v2/cat').then(x => client.user.setActivity(x.data.cat))
		.catch(err => Subaru.log('ERR', 'Trying to load cat string: \n' + err));
	}, 180000);
}