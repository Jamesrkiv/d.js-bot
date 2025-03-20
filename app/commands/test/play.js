const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const {
	createAudioPlayer,
	NoSubscriberBehavior,
	joinVoiceChannel,
	createAudioResource,
	getVoiceConnection,
	AudioPlayerStatus,
	StreamType,
} = require('@discordjs/voice');
const play = require('play-dl');

const players = {};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play audio from YouTube')
		.addStringOption(option =>
			option.setName('url')
				.setDescription('YouTube URL to play')
				.setRequired(true)),

	async execute(interaction) {
		// Avoid timeout
		await interaction.deferReply({ flags: MessageFlags.Ephemeral });

		const url = interaction.options.getString('url');
		const gid = interaction.guild.id;
		const member = interaction.member;

		// Validate URL
		if (!play.yt_validate(url)) {
			return interaction.editReply({ content: 'Invalid YouTube URL!' });
		}

		// Check if user is in a voice channel
		if (!member.voice.channel) {
			return interaction.editReply({ content: 'You must be in a voice channel to play audio!' });
		}

		// Create connection, if needed
		let connection = getVoiceConnection(gid);
		if (!connection) {
			connection = joinVoiceChannel({
				channelId: member.voice.channel.id,
				guildId: gid,
				adapterCreator: interaction.guild.voiceAdapterCreator,
			});
		}

		// Create audio player, if needed
		let player = players[gid];
		if (!player) {
			player = createAudioPlayer({
				behaviors: {
					noSubscriber: NoSubscriberBehavior.Pause,
				},
			});
			// Save audio player for server
			players[gid] = player;
		}

		// Stream audio from YouTube
		try {
			const vidInfo = await play.video_info(url);
			const vidTitle = vidInfo.video_details.title;

			const stream = await play.stream(url, { quality: 2, discordPlayerCompatibility: true });
			const resource = createAudioResource(stream.stream, { inputType: stream.type });

			player.play(resource);
			connection.subscribe(player);

			player.on(AudioPlayerStatus.Playing, () => {
				console.log('[DEBUG] Player is playing audio.');
			});

			player.on(AudioPlayerStatus.Idle, () => {
				console.log('[DEBUG] Audio finished playing.');
			});

			await interaction.editReply({ content: 'Now playing ' + vidTitle });
		}
		catch (error) {
			console.error(error);
			await interaction.editReply({ content: 'Error playing the requested audio.' });
		}
	},
};