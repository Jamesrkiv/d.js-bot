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
		.setName('resume')
		.setDescription('Resume the current track'),

	async execute(interaction) {
		// Avoid timeout
		await interaction.deferReply({ flags: MessageFlags.Ephemeral });

		const queue = useQueue(interaction.guild);
		if (!queue) return interaction.editReply('Nothing\'s currently playing');
		if (queue.node.isPlaying()) return interaction.editReply('The current track is already playing');

		const success = queue.node.resume();
		return interaction.editReply(success ? `Track **${queue.currentTrack.title}** resumed` : '❌  Something went wrong!');
	},
};