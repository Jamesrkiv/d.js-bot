// Required classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Run on ready
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Login with token
client.login(token);