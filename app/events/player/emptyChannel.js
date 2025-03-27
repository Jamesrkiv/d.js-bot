const { EmbedBuilder } = require('discord.js');

// Referencing https://github.com/ZerioDev/Music-bot

module.exports = (queue) => {
	if (queue.metadata.lyricsThread) {
		queue.metadata.lyricsThread.delete();
		queue.setMetadata({
			channel: queue.metadata.channel,
		});
	}

	(async () => {
		const embed = new EmbedBuilder()
			.setAuthor({ name: 'Nobody is in the voice channel, leaving the voice channel' })
			.setColor(0xFE83B9);

		queue.metadata.channel.send({ embeds: [embed] });
	})();
};