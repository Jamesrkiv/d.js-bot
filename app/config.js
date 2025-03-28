const process = require('process');
module.exports = {
	app: {
		token: process.env.DISCORD_TOKEN || 'xxx',
		clientId: process.env.CLIENT_ID || 'xxx',
		activity: '🌼 Testing...',
		global: true,
		guild: process.env.GUILD_ID || 'xxx',
		testGuild: process.env.TEST_GUILD || 'xxx',
		extraMessages: true,
		loopMessage: false,
		lang: 'en',
		enableEmojis: true,
		verboseLog: false,
		defaultCooldown: 3,
	},
	emojis:{
		'back': '⏪',
		'skip': '⏩',
		'ResumePause': '⏯️',
		'savetrack': '💾',
		'volumeUp': '🔊',
		'volumeDown': '🔉',
		'loop': '🔁',
	},
	opt: {
		DJ: {
			enabled: false,
			roleName: '',
			commands: [],
		},
		Translate_Timeout: 10000,
		maxVol: 100,
		spotifyBridge: true,
		volume: 75,
		leaveOnEmpty: true,
		leaveOnEmptyCooldown: 5000,
		leaveOnEnd: true,
		leaveOnEndCooldown: 5000,
		discordPlayer: {
			ytdlOptions: {
				quality: 'highestaudio',
				highWaterMark: 1 << 25,
			},
		},
	},
};