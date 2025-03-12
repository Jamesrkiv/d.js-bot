const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('View a list of available commands.'),
	async execute(interaction) {
		await interaction.reply('There are none! Dumbass.');
	},
};