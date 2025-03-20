const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

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