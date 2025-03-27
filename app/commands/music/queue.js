const {
	SlashCommandBuilder,
	MessageFlags,
	EmbedBuilder,
	AttachmentBuilder,
} = require('discord.js');
const {
	useQueue,
} = require('discord-player');
const path = require('path');

// Referencing https://github.com/ZerioDev/Music-bot

const filePath = path.resolve(__dirname, '../../../misc/art_assets/lily_icon/lily_icon_music.png');
const img = new AttachmentBuilder(filePath);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('View the current track queue'),

	async execute(interaction) {
		// Avoid timeout
		await interaction.deferReply({ flags: MessageFlags.Ephemeral });

		const queue = useQueue(interaction.guild);
		if (!queue) return interaction.editReply({ content: 'Nothing\'s currently playing!', flags: MessageFlags.Ephemeral });
		if (!queue.tracks.toArray()[0]) return interaction.editReply({ content: 'There aren\'t currently any queued tracks', flags: MessageFlags.Ephemeral });

		const methods = ['', '🔁', '🔂'];
		const songs = queue.tracks.size;
		const nextSongs = songs > 5 ? `Plus **${songs - 5}** other track(s)...` : `**${songs}** track(s) in the playlist`;
		const tracks = queue.tracks.map((track, i) => `> **${i + 1}** - ${track.title} | ${track.author} (added by: ${track.requestedBy ? track.requestedBy.displayName : 'unknown'})`);
		const embed = new EmbedBuilder()
			.setColor(0xFE83B9)
			.setThumbnail('attachment://lily_icon_music.png')
			.setAuthor({ name: `${interaction.guild.name} Track Queue ${methods[queue.repeatMode]}`, iconURL: interaction.guild.iconURL() })
			.setDescription(`Current track: ${queue.currentTrack.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`)
			.setTimestamp();

		interaction.deleteReply();
		interaction.channel.send({ embeds: [embed], files: [img] });
	},
};