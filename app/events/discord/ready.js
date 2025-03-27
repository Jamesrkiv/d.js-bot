const { Events } = require('discord.js');

// On bot ready
module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log('\x1b[36m%s\x1b[0m', `Ready! Logged in as ${client.user.tag}`);
	},
};