// Referencing https://github.com/ZerioDev/Music-bot

module.exports = async ({ interaction, queue }) => {
	if (!queue?.isPlaying()) return interaction.editReply('Nothing\'s currently playing');
	const resumed = queue.node.resume();

	if (!resumed) queue.node.pause();
	return interaction.editReply(resumed ? `Track **${queue.currentTrack.title}** resumed` : `Track **${queue.currentTrack.title}** paused`);
};