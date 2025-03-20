const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// TODO: Dynamically create buttons based on command folders, pull list of commands from each
// Can the exported 'data' be accessed to get command descriptions? Or names, should the formatting be different?

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Get the avatar of this server or a given user')
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('Get the profile picture of a user')
				.addUserOption(option =>
					option.setName('target')
						.setDescription('user to target')
						.setRequired(true),
				))
		.addSubcommand(subcommand =>
			subcommand
				.setName('server')
				.setDescription('Get the server icon')),

	async execute(interaction) {
		const target = interaction.options.getUser('target') ?? null;
		const pfpEmbed = new EmbedBuilder()
			.setTitle(target ? target.username : interaction.guild.name)
			.setColor(0xFE83B9)
			.setImage(target ? target.displayAvatarURL() : interaction.guild.iconURL());
		await interaction.reply({ embeds: [pfpEmbed] });
	},
};