const { Events, ActivityType } = require('discord.js');
const initDB = require('../../init-database.js');

// On bot ready
module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		try {
			// Authenticate db and set up tables if needed
			await db.authenticate();
			await initDB.initialize();
			console.log('\x1b[90m%s\x1b[0m', 'LOAD || Database connected successfully');
		}
		catch (error) {
			return console.log('\x1b[31m%s\x1b[0m', `ERR! || Database error <${error}>`);
		}
		console.log('\x1b[36m%s\x1b[0m', `Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity({
			name: client.config.app.activity,
			type: ActivityType.Custom,
		});
	},
};