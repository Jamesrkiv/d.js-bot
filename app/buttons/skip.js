// Referencing https://github.com/ZerioDev/Music-bot

module.exports = async ({ interaction, queue }) => {
    if (!queue?.isPlaying()) return interaction.editReply('Nothing\'s currently playing');
    const success = queue.node.skip();

    return interaction.editReply(success ? `Track **${queue.currentTrack.title}** skipped` : '❌  Something went wrong!');
}