const {
	SlashCommandBuilder,
	EmbedBuilder,
	AttachmentBuilder,
	MessageFlags,
} = require('discord.js');
const fs = require('node:fs');
const path = require('path');

// Image for embed
const imgPath = path.resolve(__dirname, '../../../misc/art_assets/lily_icon/lily_icon_d.png');
const img = new AttachmentBuilder(imgPath);

// JSON of command categories w/ respective commands
const commandDir = {};
// Command categories for autofill
const helpOptions = [];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('View a list of available commands')
		.addStringOption(option =>
			option.setName('category')
				.setDescription('The help category you wish to view')
				.setAutocomplete(true)
				.setRequired(true),
		),
	async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
		const filtered = helpOptions.filter(choice => choice.startsWith(focusedValue));
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	},
	async execute(interaction) {
		const cat = interaction.options.getString('category');
		if (!commandDir[cat]) return interaction.reply({ content: 'There\'s no help category matching `' + cat + '`', flags: MessageFlags.Ephemeral });
		// Get list of commands w/ descriptions as string
		let commandList = '';
		for (const cmd of commandDir[cat]) {
			if (commandList !== '') commandList += '\n\n';
			commandList += '> **' + cmd['name'] + '**\n> ' + cmd['description'];
		}
		// Send embed for chosen category
		const helpEmbed = new EmbedBuilder()
			.setColor(0xFE83B9)
			.setThumbnail('attachment://lily_icon_d.png')
			.setTitle(cat.charAt(0).toUpperCase() + cat.slice(1) + ' Commands')
			.setDescription(commandList);
		interaction.reply({ embeds: [helpEmbed], files: [img] });
	},
};

// Dynamically parse existing commands
const foldersPath = path.join(__dirname, '../');
const commandFolders = fs.readdirSync(foldersPath);
// Use each folder as a command category
for (const folder of commandFolders) {
	// Ignore test commands
	if (folder == 'test') continue;
	commandDir[folder] = [];
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Add the name/description of each command to array for given category (folder)
	for (const file of commandFiles) {
		const command = require(commandsPath + '/' + file);
		commandDir[folder].push({
			'name': command.data.name,
			'description': command.data.description,
		});
	}
	helpOptions.push(folder);
}