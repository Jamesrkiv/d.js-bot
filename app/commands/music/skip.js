const {
	SlashCommandBuilder,
} = require('discord.js');
const {
	useQueue,
} = require('discord-player');

// Referencing https://github.com/ZerioDev/Music-bot

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skip the currently playing audio'),

	async execute(interaction) {
		// Avoid timeout
		await interaction.deferReply();

		const queue = useQueue(interaction.guild);
		if (!queue?.isPlaying()) return interaction.editReply('Nothing\'s currently playing!');

		const success = queue.node.skip();

		return interaction.editReply(success ? `⏩  Skipped **${queue.currentTrack.title}**` : '❌  Something went wrong!');
	},
};