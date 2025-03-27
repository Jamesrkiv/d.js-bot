const { EmbedBuilder } = require('discord.js');

// Referencing https://github.com/ZerioDev/Music-bot

module.exports = (queue, track) => {

	(async () => {
		const embed = new EmbedBuilder()
			.setAuthor({ name: `⏩  Skipping ${track.title}` })
			.setColor(0xFE83B9);

		queue.metadata.channel.send({ embeds: [embed], iconURL: track.thumbnail });
	})();
};