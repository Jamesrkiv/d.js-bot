const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
	async initialize() {
		// Config settings
		const dbPath = client.config.app.dbPath;
		const verbLog = client.config.app.verboseLog;

		// Create/connect database
		const initDB = new Sequelize({
			dialect: 'sqlite',
			logging: false,
			storage: dbPath,
		});

		// Define User table
		initDB.define('User', {
			userID: {
				type: DataTypes.TEXT,
				primaryKey: true,
				allowNull: false,
			},
			balance: {
				type: DataTypes.REAL,
				defaultValue: 0,
			},
		});

		// Sync table(s) and return db
		await initDB.sync();
		if (verbLog) console.log('\x1b[36m%s\x1b[0m', 'LOAD || Database initialized');
		return initDB;
	},
};