// Referencing https://github.com/ZerioDev/Music-bot

module.exports = (queue) => {
	if (queue.metadata.lyricsThread) {
		queue.metadata.lyricsThread.delete();
		queue.setMetadata({
			channel: queue.metadata.channel,
		});
	}
};