const { Sequelize, DataTypes, Model, QueryTypes } = require('sequelize');

class User extends Model {}

module.exports = {
	async initialize() {
		// Define table(s)
		const User = db.define('User', {
			userID: {
				type: DataTypes.TEXT,
				primaryKey: true,
			},
		});
		// Create table(s) if they don't exist
		await db.sync();
	},
};