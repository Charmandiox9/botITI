const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Desbanea a un usuario")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption((option) =>
      option
        .setName("usuario")
        .setDescription("Ingresa el ID del usuario")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { channel, options } = interaction;
    const userId = options.getString("usuario");
    const unbanEmbed = new EmbedBuilder();

    try {
      await interaction.guild.members.unban(userId);
      unbanEmbed
        .setTitle(`**Desbanee a ${userId}**`)
        .setDescription(
          `<@${userId}> ha sido desbaneado.\n**Mod:** ${interaction.user.tag}`
        )
        .setColor(`#66CCFF`)
        .setTimestamp();

      await interaction.reply({ embeds: [unbanEmbed] });
    } catch (error) {
      console.error(error);
      unbanEmbed
        .setTitle(`**Error al desbanear**`)
        .setDescription(`La ID **${userId}** no se encuentra baneada.`)
        .setColor(`#FF0000`)
        .setTimestamp();

      await interaction.reply({ embeds: [unbanEmbed] });
    }
  },
};
