const { SlashCommandBuilder } = require('discord.js');
const {
	createAudioPlayer,
	NoSubscriberBehavior,
	joinVoiceChannel,
	createAudioResource,
	getVoiceConnection,
} = require('@discordjs/voice');
const play = require('play-dl');

const players = {};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play audio from YouTube')
		.addStringOption(option =>
			option.setName('url')
				.setRequired(true)),

	async execute(interaction) {
		const url = interaction.options.getString('url');
		const gid = interaction.guild.id;

		// Validate URL
		if (!play.yt_validate(url)) {
			return interaction.reply({ content: 'Invalid YouTube URL!', ephemeral: true });
		}

		// Check if user is in a voice channel
		if (!member.voice.channel) {
			return interaction.reply({ content: 'You must be in a voice channel to play audio!', ephemeral: true });
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
			const stream = await play.stream(url);
			const vidInfo = await play.video_info(url);
			const vidTitle = vidInfo.video_details.title;
			const resource = createAudioResource(stream.stream, { inputType: stream.type });
			
			player.play(resource);
			connection.subscribe(player);
			await interaction.reply({ content: `Now playing ${vidTitle}`, ephemeral: true });
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'Error playing the requested audio.', ephemeral: true });
		}
	},
};