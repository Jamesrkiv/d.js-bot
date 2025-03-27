const { EmbedBuilder } = require('discord.js');

// Referencing https://github.com/ZerioDev/Music-bot

module.exports = (queue) => {

	(async () => {
		const embed = new EmbedBuilder()
			.setAuthor({ name: 'No more songs in the queue' })
			.setColor(0xFE83B9);

		queue.metadata.channel.send({ embeds: [embed] });
	})();
};