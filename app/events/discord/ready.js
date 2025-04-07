const { Events, ActivityType } = require('discord.js');
const initDB = require('../../init-database.js');

// On bot ready
module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {

		// Create connection to database
		try {
			// Initialize database
			global.db = await initDB.initialize();
			await db.authenticate();
		}
		catch (error) {
			console.log('\x1b[31m%s\x1b[0m', `ERR! || Database error <${error}>`);
			return process.exit(0);
		}

		// Ready message
		console.log('\x1b[36m%s\x1b[0m', `Ready! Logged in as ${client.user.tag}`);

		// Set custom bot status
		client.user.setActivity({
			name: client.config.app.activity,
			type: ActivityType.Custom,
		});
	},
};