const { EmbedBuilder } = require('discord.js');

// Referencing https://github.com/ZerioDev/Music-bot

module.exports = (queue, track) => {
	if (!client.config.app.extraMessages) return;

	(async () => {
		const embed = new EmbedBuilder()
			.setAuthor({ name: `Track ${track.title} added to queue  🎵`, iconURL: track.thumbnail })
			.setColor(0xFE83B9);

		queue.metadata.channel.send({ embeds: [embed] });
	})();
};