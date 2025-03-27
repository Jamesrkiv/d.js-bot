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
		.setName('pause')
		.setDescription('Pause the current track'),

	async execute(interaction) {
		// Avoid timeout
		await interaction.deferReply({ flags: MessageFlags.Ephemeral });

		const queue = useQueue(interaction.guild);
		if (!queue?.isPlaying()) return interaction.editReply('Nothing\'s currently playing');
		if (queue.node.isPaused()) return interaction.editReply('The current track is already paused');

		const success = queue.node.setPaused(true);
		return interaction.editReply(success ? `Track **${queue.currentTrack.title}** paused` : '❌  Something went wrong!');
	},
};