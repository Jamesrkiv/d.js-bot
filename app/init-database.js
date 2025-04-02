const { DataTypes } = require('sequelize');

module.exports = {
	async initialize() {
		// Define table(s)
		db.define('User', {
			userID: {
				type: DataTypes.TEXT,
				primaryKey: true,
			},
		});
		// Create table(s) if they don't exist
		await db.sync();
	},
};