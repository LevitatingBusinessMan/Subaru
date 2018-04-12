module.exports = { run : Subaru => {
	//Check if API token exists.
	try {
	APIs = ["show_invite", "googleGeoAPIkey", "DarkSkyAPIKey", "googleShortenerApiKey", "bitlyApiLogin", "bitlyApiKey", "CatAPI", "youtubeSearchApi", "image_api"];
	
	for (let i=0; APIs.length > i; i++){
		if (!Subaru.config[APIs[i]]){
		let DisabledCommands = new Array;
		for (let property in Subaru.cmd){
			let cmd = Subaru.cmd[property];
			if (cmd.require) {
				if (cmd.require.includes(APIs[i])) DisabledCommands.push(cmd.name);
				Subaru.cmd[property].disabled = true;
			}
		}
		Subaru.log("warn", APIs[i] + " missing. Disabled commands: " + DisabledCommands.join(", "));
		}
	}
	} catch (err) {
	Subaru.error(err);
	}
}};