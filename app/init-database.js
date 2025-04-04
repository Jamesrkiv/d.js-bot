const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
	async initialize(path) {
		// Create/connect database
		const newDB = new Sequelize({
			dialect: 'sqlite',
			logging: false,
			storage: path,
		});

		// Define table(s)
		newDB.define('User', {
			userID: {
				type: DataTypes.TEXT,
				primaryKey: true,
			},
		});

		// Sync database and close connection
		await newDB.sync();
		newDB.close();

		// Log message
		return console.log('\x1b[36m%s\x1b[0m', 'Created new database');
	},
};