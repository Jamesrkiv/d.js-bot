const { Events, MessageFlags, InteractionType } = require('discord.js');
const { useQueue } = require('discord-player');

// Handle interactions & errors
module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.type === InteractionType.ApplicationCommand) {

			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.execute(interaction);
			}
			catch (error) {
				console.error(error);
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
				}
				else {
					await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
				}
			}
		}
		else if (interaction.type === InteractionType.MessageComponent) {
			await interaction.deferReply({ flags: MessageFlags.Ephemeral });

	        const customId = interaction.customId;
	        if (!customId) return;

	        const queue = useQueue(interaction.guild);
	        const path = `../../buttons/${customId}.js`;

	        delete require.cache[require.resolve(path)];
	        const button = require(path);
	        if (button) return button({ client, interaction, customId, queue });
	    }
	},
};