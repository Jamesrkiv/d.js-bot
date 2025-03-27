module.exports = (queue, error) => {
	(async () => {
		queue.metadata.channel.send('Bot had an unexpected error, please check the console!');
		console.log(`Error emitted from the Player <${error}>`);
	})();
};