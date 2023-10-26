const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Elimina una cantidad de mensajes de un canal")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption((option) =>
      option
        .setName("cantidad")
        .setDescription("Cantidad de mensajes a eliminar")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("usuario")
        .setDescription("Eliminar mensajes de usuario")
        .setRequired(false)
    ),
  async execute(interaction) {
    const { channel, options } = interaction;

    const amount = options.getInteger("cantidad");
    const target = options.getUser("usuario");

    if (amount > 99) {
      const errorEmbed = new EmbedBuilder()
        .setColor("020202")
        .setTitle(
          "<:Staff:1111683988248072252> Error En El Comando <:Not:1099782548562919535>"
        )
        .setDescription(
          `<:Premium:1111359379543969852> **|** *No Se Pueden Eliminar Más De* __**99**__ *Mensajes a La Vez*`
        );
      return interaction.reply({ embeds: [errorEmbed] });
    }

    const messages = await channel.messages.fetch({
      limit: amount + 1,
    });

    const res = new EmbedBuilder().setColor("#45B383");

    if (target) {
      let i = 0;
      const filtered = [];

      (await messages).filter((msg) => {
        if (msg.author.id === target.id && amount > i) {
          filtered.push(msg);
          i++;
        }
      });

      await channel.bulkDelete(filtered).then((messages) => {
        res.setDescription(
          `<:Yes:1099783031033700462> Eliminado Con Exito ${messages.size} Mensajes De ${target}`
        );
        interaction.reply({ embeds: [res] });
      });
    } else {
      await channel.bulkDelete(amount, true).then((messages) => {
        res.setDescription(
          `<:Yes:1167173657131495434> Eliminado Con Exito ${messages.size} Mensajes Del Chat`
        );
        interaction.reply({ embeds: [res] });
      });
    }
  },
};
