const fs = require('fs-extra');

 module.exports = {
	name: 'backgrounds',
	catagory: 'General',
	description:'Show all backgrounds',
	usage:'backgrounds',
	require : ["image_api"],
	
	run : async (Subaru, client, args, message) => {
		try {
			
			if (!args[0]) {
			
				let page = await Subaru.browser.newPage();
				
				let backgrounds = await fs.readdir('./util/assets/backgrounds');
								
				await page.goto('data:text/html,' +
					require('pug').compileFile('./util/pug_templates/backgrounds.pug')({backgrounds})
				);

				await page.screenshot({omitBackground: true, clip: {
					x: 0,
					y: 0,
					width: 1020,
					height: 580 //¯\_(ツ)_/¯
				}})
				.then(x => message.channel.send('These are Subaru\'s available images:',{file: x}));
			}

		} catch (err) {
			message.channel.send('An error occured :v');
			Subaru.error(err, message);
		}
	}
 }