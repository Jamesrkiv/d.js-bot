const {
	Events,
	MessageFlags,
	InteractionType,
	Collection,
} = require('discord.js');
const {
	useQueue,
} = require('discord-player');

// Handle interactions & errors
module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.type === InteractionType.ApplicationCommand) {
			const command = interaction.client.commands.get(interaction.commandName);
			if (!command) {
				console.log('\x1b[31m%s\x1b[0m', ` ERR! || No command matching ${interaction.commandName} was found.`);
				return;
			}

			// Cooldown logic
			const { cooldowns } = interaction.client;
			if (!cooldowns.has(command.data.name)) cooldowns.set(command.data.name, new Collection());
			const now = Date.now();
			const timestamps = cooldowns.get(command.data.name);
			const defaultCooldownDuration = 3;
			const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;
			if (timestamps.has(interaction.user.id)) {
				const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

				if (now < expirationTime) {
					const expiredTimestamp = Math.round(expirationTime / 1000);
					return interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, flags: MessageFlags.Ephemeral });
				}
			}

			timestamps.set(interaction.user.id, now);
			setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

			try {
				await command.execute(interaction);
			}
			catch (error) {
				console.log('\x1b[31m%s\x1b[0m', 'ERR! || ' + error);
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
		else if (interaction.type === InteractionType.ApplicationCommandAutocomplete) {
			const command = interaction.client.commands.get(interaction.commandName);
			if (!command) {
				console.log('\x1b[31m%s\x1b[0m', ` ERR! || No command matching ${interaction.commandName} was found.`);
				return;
			}
			try {
				await command.autocomplete(interaction);
			}
			catch (error) {
				console.log('\x1b[31m%s\x1b[0m', 'ERR! || ' + error);
			}
		}
	},
};