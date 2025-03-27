const { EmbedBuilder } = require('discord.js');

// Referencing https://github.com/ZerioDev/Music-bot

module.exports = (queue) => {
	if (!client.config.app.extraMessages) return;

	(async () => {
		const embed = new EmbedBuilder()
			.setAuthor({ name: '🎵  All the songs in playlist added to the queue' })
			.setColor(0xFE83B9);

		queue.metadata.channel.send({ embeds: [embed] });
	})();
};