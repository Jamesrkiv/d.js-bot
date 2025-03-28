const {
	ActionRowBuilder,
	ButtonBuilder,
	EmbedBuilder,
} = require('discord.js');

// Referencing https://github.com/ZerioDev/Music-bot

module.exports = (queue, track) => {
	if (!client.config.app.loopMessage && queue.repeatMode !== 0) return;

	let EmojiState = client.config.app.enableEmojis;
	const emojis = client.config.emojis;
	if (!emojis) EmojiState = false;

	(async () => {
		const embed = new EmbedBuilder()
			.setTitle(`Playing ${track.title}`)
			.setDescription(`in ${queue.channel.name}  🎧`)
			.setThumbnail(track.thumbnail)
			.setColor(0xFE83B9);

		const back = new ButtonBuilder()
			.setLabel(EmojiState ? emojis.back : ('Back'))
			.setCustomId('back')
			.setStyle('Primary');

		const resumepause = new ButtonBuilder()
			.setLabel(EmojiState ? emojis.ResumePause : ('Pause/Resume'))
			.setCustomId('resume&pause')
			.setStyle('Success');

		const skip = new ButtonBuilder()
			.setLabel(EmojiState ? emojis.skip : ('Skip'))
			.setCustomId('skip')
			.setStyle('Primary');

		const loop = new ButtonBuilder()
			.setLabel(EmojiState ? emojis.loop : ('Loop'))
			.setCustomId('loop')
			.setStyle('Secondary');

		const lyrics = new ButtonBuilder()
			.setLabel('Lyrics')
			.setCustomId('lyrics')
			.setStyle('Secondary');

		const row1 = new ActionRowBuilder().addComponents(
			back,
			resumepause,
			skip,
			//loop,
			//lyrics,
		);
		queue.metadata.channel.send({ embeds: [embed], components: [row1] });
	})();
};