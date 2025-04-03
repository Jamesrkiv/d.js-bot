const { Sequelize, DataTypes } = require('sequelize');

module.exports = {
	async initialize(path) {
		// Create/connect database
		const db = new Sequelize({
			dialect: 'sqlite',
			logging: false,
			storage: path,
		});

		// Define table(s)
		db.define('User', {
			userID: {
				type: DataTypes.TEXT,
				primaryKey: true,
			},
		});

		await db.sync();
		db.close();
		
		return console.log('\x1b[36m%s\x1b[0m', 'Created new database');
	},
};