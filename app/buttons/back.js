// Referencing https://github.com/ZerioDev/Music-bot

module.exports = async ({ interaction, queue }) => {
	if (!queue?.isPlaying()) return interaction.editReply('Nothing\'s currently playing');
	if (!queue.history.previousTrack) return interaction.editReply('There\'s no previous audio to play');

	await queue.history.back();

	interaction.editReply('Playing the previous track');
};