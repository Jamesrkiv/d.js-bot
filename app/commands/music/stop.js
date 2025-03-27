const {
	SlashCommandBuilder,
	MessageFlags,
	EmbedBuilder,
} = require('discord.js');
const {
	useQueue,
} = require('discord-player');

// Referencing https://github.com/ZerioDev/Music-bot

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stop all audio'),

	async execute(interaction) {
		// Avoid timeout
		await interaction.deferReply({ flags: MessageFlags.Ephemeral });

		const queue = useQueue(interaction.guild);
		if (!queue?.isPlaying()) return interaction.editReply({ content: 'Nothing\'s currently playing!', flags: MessageFlags.Ephemeral });

		queue.delete();

		const embed = new EmbedBuilder()
			.setColor(0xFE83B9)
			.setAuthor({ name: 'Cancelled all current/queued tracks' });

		interaction.deleteReply();
		return interaction.channel.send({ embeds: [embed] });
	},
};