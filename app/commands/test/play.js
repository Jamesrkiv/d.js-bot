const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play audio from YouTube')
		.addStringOption(option =>
			option.setName('url')
				.setDescription('YouTube URL to play')
				.setRequired(true)),

	async execute(interaction) {
		// Avoid timeout
		await interaction.deferReply({ flags: MessageFlags.Ephemeral });

		const url = interaction.options.getString('url');
		const gid = interaction.guild.id;
		const member = interaction.member;

		// TODO
	},
};