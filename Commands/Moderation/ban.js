const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Banea a un usuario del servidor")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption((option) =>
      option
        .setName("usuario")
        .setDescription("Elige el usuario a banear")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("razon")
        .setDescription("Razon del baneo")
        .setRequired(false)
    ),
  async execute(interaction) {
    const { options } = interaction;
    await interaction.deferReply({ ephemeral: true });

    const user = options.getUser("usuario");
    const razon = options.getString("razon") || "No se especific贸 una raz贸n";

    const member = await interaction.guild.members.fetch(user.id);

    const embedError = new EmbedBuilder()
      .setDescription(`No pude banear a ${user} ya que esta inmunizado`)
      .setColor("#99FFCC");

    if (
      member.roles.highest.position >= interaction.member.roles.highest.position
    ) {
      return interaction.editReply({ embeds: [embedError] });
    }

    try {
      await member.ban({ reason: razon });

      const embedBan = new EmbedBuilder()
        .setTitle(`**Banee a ${user.tag}.**`)
        .setDescription(`**Raz贸n:** ${razon}\nMod: ${interaction.user.tag}`)
        .addFields({ name: "**Id**", value: `${user.id}` })
        .setColor("#66CCFF")
        .setTimestamp();

      await interaction.editReply({ embeds: [embedBan] });
    } catch (error) {
      console.error(error);
      return interaction.editReply({
        content: `Ocurri贸 un error al banear a ${user.tag}.`,
      });
    }
  },
};
