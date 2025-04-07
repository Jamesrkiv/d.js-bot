module.exports = {
	// Create new user in User table
	async newUser(uid) {
		const User = db.models.User;
		try {
			await User.create({ userID: uid.toString() });
			return true;
		}
		catch (error) {
			console.log('\x1b[31m%s\x1b[0m', `ERR! || Error creating User <${error}>`);
			return false;
		}
	},
	// Check if user ID exists within User table
	async userExists(uid) {
		const User = db.models.User;
		try {
			const res = await User.findAll({
				where: { userID: uid.toString() },
			});
			return res.length !== 0;
		}
		catch (error) {
			console.log('\x1b[31m%s\x1b[0m', `ERR! || Error locating User <${error}>`);
			return null;
		}
	},
};