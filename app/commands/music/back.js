const {
	SlashCommandBuilder,
	MessageFlags,
} = require('discord.js');
const {
	useQueue,
} = require('discord-player');

// Referencing https://github.com/ZerioDev/Music-bot

module.exports = {
	data: new SlashCommandBuilder()
		.setName('back')
		.setDescription('Go back to previously track'),

	async execute(interaction) {
		// Avoid timeout
		await interaction.deferReply({ flags: MessageFlags.Ephemeral });

		const queue = useQueue(interaction.guild);
		if (!queue?.isPlaying()) return interaction.editReply('Nothing\'s currently playing');

		if (!queue.history.previousTrack) return interaction.editReply('There\'s no previous audio to play');

		await queue.history.back();

		interaction.editReply('Playing the previous track');
	},
};