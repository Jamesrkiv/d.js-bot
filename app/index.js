require('dotenv').config();
const {
	Client,
	Collection,
	GatewayIntentBits,
} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

// Client instance
global.client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
	disableMentions: 'everyone',
});
client.config = require('./config');
client.commands = new Collection();
client.cooldowns = new Collection();

// Stuff for music/audio
const { Player } = require('discord-player');
const { YoutubeiExtractor } = require('discord-player-youtubei');

// Create Discord player
const player = new Player(client, client.config.opt.discordPlayer);
player.extractors.register(YoutubeiExtractor, {});

// Settings
const verbLog = client.config.app.verboseLog;

// Get commands
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		else {
			console.log('\x1b[33m%s\x1b[0m', `WARN || The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Get events
const eventsPath = path.join(__dirname, 'events/discord');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
		if (verbLog) console.log('\x1b[90m%s\x1b[0m', `LOAD || Loaded Discord event <${file.split('.')[0]}>`);
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
		if (verbLog) console.log('\x1b[90m%s\x1b[0m', `LOAD || Loaded Discord event <${file.split('.')[0]}>`);
	}
}

// Get player events
const playerEventsPath = path.join(__dirname, 'events/player');
const playerEventFiles = fs.readdirSync(playerEventsPath).filter(file => file.endsWith('.js'));
for (const file of playerEventFiles) {
	const PlayerEvent = require(`./events/player/${file}`);
	if (verbLog) console.log('\x1b[90m%s\x1b[0m', `LOAD || Loaded Player event <${file.split('.')[0]}>`);
	player.events.on(file.split('.')[0], PlayerEvent.bind(null));
	delete require.cache[require.resolve(`./events/player/${file}`)];
}

// Login with token
client.login(client.config.app.token);