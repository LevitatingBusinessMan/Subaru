module.exports = {
	name: 'weather',
	catagory: 'Utility',
	description: 'Retrieve a weather report',
	usage: 'weather Amsterdam',
	require : ["googleGeoAPIkey", "DarkSkyAPIKey"],
	
	run : async (Subaru, client, args, message) => {
		try {
			const GoogleKey = Subaru.config.googleGeoAPIkey;
			const DarkSkyKey = Subaru.config.DarkSkyAPIKey;
			if (!args[0]){ Subaru.respond(message,"Specify an address kthnx"); return; }
			const request = require("axios");
			var G_result = await request.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${args.join("+").toString()}&key=${GoogleKey}`);
			if (G_result.data.error || G_result.data.error) { Subaru.respond(message,"Something went wrong :v"); return; }
			if (G_result.data.status == "ZERO_RESULTS") { Subaru.respond(message,"Address not found :v"); return; }
			var Geo = new Object;
			Geo.address = G_result.data.results[0].formatted_address;
			Geo.lat = G_result.data.results[0].geometry.location.lat;
			Geo.lng = G_result.data.results[0].geometry.location.lng;
			var result = (await request.get(`https://api.darksky.net/forecast/${DarkSkyKey}/${Geo.lat},${Geo.lng}?exclude=currently,minutely,daily,alerts,flags`)).data.hourly;
			Subaru.respond(message, {embed: {
					hexColor: '#ffff00',
					title: getIcon() + ' Weather report',
					description: result.summary,
					fields:  [{
						name: "Location",
						value: Geo.address.replace(/, /g , "\n"),
						inline: true
					},{
						name: "Summary",
						value: result.data[0].summary,
						inline: true
					},{
						name: "Temperature",
						value: (result.data[0].temperature).toFixed(1) + '°F\n' +  ((result.data[0].temperature-32)*(5/9)).toFixed(1)  + '°C',
						inline: true
					},{
						name: "Precipitation",
						value: Math.round(result.data[0].precipProbability) * 100 + '%, ' + result.data[0].precipType,
						inline: true
					},{
						name: "Humidity",
						value: Math.round(result.data[0].humidity * 100) + '%',
						inline: true
					},{
						name: "Wind speed",
						value: result.data[0].windSpeed.toFixed(1)   + 'm/h\n' + (result.data[0].windSpeed * 1.609344).toFixed(1)  + 'km/h',
						inline: true
					}],
					footer:{
						text: 'powered by https://darksky.net'
					},
					timestamp: new Date()}
			});
			
			function getIcon() {
				switch (result.icon) {
					case 'clear-night': return ':city_sunset:';
					case 'rain': return ':cloud_rain:';
					case 'snow': return ':cloud_snow:';
					case 'wind': return ':dash:';
					case 'fog': return ':foggy:';
					case 'cloudy': return ':cloud:';
					case 'partly-cloudy-day': return ':white_sun_small_cloud:';
					case 'partly-cloudy-night': return ':night_with_stars:';
				}
			}
			
		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
}

