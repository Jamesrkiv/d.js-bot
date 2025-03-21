const {
	SlashCommandBuilder,
	MessageFlags,
} = require('discord.js');
const {
	QueryType,
	useMainPlayer,
} = require('discord-player');

// Referencing https://github.com/ZerioDev/Music-bot/blob/master/main.js
// Author: ZerioDev

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play audio from YouTube, Spotify, or SoundCloud')
		.addStringOption(option =>
			option.setName('song')
				.setDescription('Song to play')
				.setRequired(true)),

	async execute(interaction) {
		// Avoid timeout
		await interaction.deferReply(/*{ flags: MessageFlags.Ephemeral }*/);

		const player = useMainPlayer();

		const song = interaction.options.getString('song');
		const res = await player.search(song, {
			requestedBy: interaction.member,
			searchEngine: QueryType.AUTO,
		});

		if (!res?.tracks.length) {
			return interaction.editReply(`No results found for **${song}** ❌`);
		}

		try {
			const { track } = await player.play(interaction.member.voice.channel, song, {
				nodeOptions: {
					metadata: {
						channel: interaction.channel,
					},
					volume: client.config.opt.volume,
					leaveOnEmpty: client.config.opt.leaveOnEmpty,
					leaveOnEmptyCooldown: client.config.opt.leaveOnEmptyCooldown,
					leaveOnEnd: client.config.opt.leaveOnEnd,
					leaveOnEndCooldown: client.config.opt.leaveOnEndCooldown,
				},
			});
			await interaction.editReply(`🎵  Loading **${track.title}** to the queue`);
		}
		catch (error) {
			console.log(`Play error: ${error}`);
			return interaction.editReply('I can\'t join the voice channel ❌');
		}
	},
};