const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// TODO: Dynamically create buttons based on command folders, pull list of commands from each
// Can the exported 'data' be accessed to get command descriptions? Or names, should the formatting be different?

const helpEmbed = new EmbedBuilder()
	.setColor(0xFE83B9)
	.setTitle('Command List')
	.setDescription('All currently available commands');

const utilCommands = new ButtonBuilder()
	.setCustomId('utilcmd')
	.setLabel('Utility Commands')
	.setStyle(ButtonStyle.Secondary);

const row = new ActionRowBuilder()
	.addComponents(utilCommands);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('View a list of available commands.'),
	async execute(interaction) {
		const response = await interaction.reply({ embeds: [helpEmbed], components: [row], withResponse: true });
		const collectorFilter = i => i.user.id === interaction.user.id;
		try {
			const confirmation = await response.resource.message.awaitMessageComponent({ filter: collectorFilter, time: 10_000 });
			switch (confirmation.customId) {
			case 'utilcmd':
				// Utility commands selected
				break;
			default:
				// Default
				break;
			}
			await confirmation.update({ components: [] });
		}
		catch {
			await interaction.editReply({ components: [] });
		}
	},
};