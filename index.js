console.log('\033[2J');
const Discord = require("discord.js");
const fs = require('fs-extra');
const chalk = require('chalk');
Spinner = require('cli-spinner').Spinner;

var Subaru = new Object;
Subaru.config = require("./config/config.js");
Subaru.client = new Discord.Client();
Subaru.packagejson = require('./package.json');
require('./util/SubaruBuilder.js')(Subaru);

// Load Enmap
const Enmap = require('enmap');

// Load EnmapLevel
const EnmapLevel = require('enmap-level');

const usersLeveldb = new EnmapLevel({ name: 'USERS' });
Subaru.USERS = new Enmap({ provider: usersLeveldb });

const guildsLeveldb = new EnmapLevel({ name: 'GUILDS' });
Subaru.GUILDS = new Enmap({ provider: guildsLeveldb });

//Create map for destructors
Subaru.destructors = new Map();

//Create map for messages that weren't commands
Subaru.editMessages = new Map();

//Create object for voice
Subaru.voice = new Object();

const init = async (callback) => {
await Subaru.USERS.defer;
await Subaru.GUILDS.defer;

//Read commands
let commands = await fs.readdir('./commands');

Subaru.log('OK', `Found ${commands.length} commands.`);
Subaru.cmd = new Object;
let i = 0;
commands.forEach(commandFile => {
	try {
	let name = commandFile.split('.')[0];
	Subaru.cmd[name] = require(`./commands/${commandFile}`);
	Subaru.cmd[name].file = commandFile;
	i++;
	} catch (err){Subaru.log('err', `Failed to load ${commandFile} \n ${err}`)} 
});
if (i == commands.length) Subaru.log('OK', 'All commands loaded!')

//Read events
let events = await fs.readdir('./events');
Subaru.log('OK', `Found ${events.length} events.`);
Subaru.event = new Object;
let foo = 0;
events.forEach(eventFile => {
	try {
	const event = require(`./events/${eventFile}`);
	let name = eventFile.split('.')[0];
	Subaru.event[name] = event;
	Subaru.event[name].file = eventFile;
	Subaru.client.on(event.name, (...args) => {event.run(Subaru, Subaru.client, ...args)});
	foo++;
	} catch (err) {Subaru.log('err', `Failed to load ${eventFile} \n ${err}`)}
});
if (foo == events.length) Subaru.log('OK', 'All events loaded!')
	
Subaru.log('ok', `Loaded ${Subaru.GUILDS.size} guilds from DB!`);
Subaru.log('ok', `Loaded ${Subaru.USERS.size} users from DB!`);
	
callback();
};

init(login);

function login(){
require('./util/APIcheck.js').run(Subaru);
let loader = new Spinner(chalk.red("logging in.. ") + chalk.green("%s"));
loader.setSpinnerString("⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏");
loader.start();
Subaru.loader = loader;
Subaru.client.login(Subaru.config.token);
}