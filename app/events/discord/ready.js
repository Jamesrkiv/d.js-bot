const { Events, ActivityType } = require('discord.js');
const { Sequelize } = require('sequelize');
const fs = require('node:fs');
const initDB = require('../../init-database.js');

// On bot ready
module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		// Config settings
		const verbLog = client.config.app.verboseLog;
		const dbPath = client.config.app.dbPath;
		try {
			// Create new database if needed
			if (!fs.existsSync(dbPath)) await initDB.initialize(dbPath);
			// Connect to database
			global.db = new Sequelize({
				dialect: 'sqlite',
				logging: false,
				storage: dbPath,
			});
			await db.authenticate();
		}
		catch (error) {
			return console.log('\x1b[31m%s\x1b[0m', `ERR! || Database error <${error}>`);
			process.exit(0);
		}
		if (verbLog) console.log('\x1b[90m%s\x1b[0m', 'LOAD || Database connected successfully');
		console.log('\x1b[36m%s\x1b[0m', `Ready! Logged in as ${client.user.tag}`);
		// Set custom bot status
		client.user.setActivity({
			name: client.config.app.activity,
			type: ActivityType.Custom,
		});
	},
};