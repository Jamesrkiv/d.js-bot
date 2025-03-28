module.exports = (queue, error) => {
	(async () => {
		queue.metadata.channel.send('Bot had an unexpected error, please check the console!');
		console.log('\x1b[31m%s\x1b[0m', `ERR! || Error emitted from the Bot <${error}>`);
	})();
};