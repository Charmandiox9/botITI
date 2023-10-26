// Codigo Creado por ! Duban#7823 //
// Codigo Creado por ! Duban#7823 //
// Codigo Creado por ! Duban#7823 //
// Codigo Creado por ! Duban#7823 //

const { EmbedBuilder } = require("@discordjs/builders");
const { DiscordTogether } = require("discord-together");
const {
  Client,
  SlashCommandBuilder,
  ChannelType,
  ChatInputCommandInteraction,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("youtube")
    .setDescription("Ver videos de youtube juntos!")
    .addChannelOption((option) =>
      option
        .setName("canal")
        .setDescription("¡Canal que quieres activar esta actividad!")
        .addChannelTypes(ChannelType.GuildVoice)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("actividad")
        .setDescription("La actividad que desea realizar!")
        .setRequired(true)
        .addChoices({ name: "📺 Youtube", value: "youtube" })
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const discordTogether = new DiscordTogether(client);
    const { options } = interaction;
    const activity = options.getString("actividad");
    const channel = options.getChannel("canal");

    const Response = new EmbedBuilder().setFooter({
      text: client.user.tag,
      iconURL: client.user.displayAvatarURL(),
    });

    switch (activity) {
      case "youtube":
        {
          Response.setTitle("📺 Youtube");
          discordTogether
            .createTogetherCode(channel.id, "youtube")
            .then((x) => {
              Response.setDescription(
                `[Haga clic para ver youtube](${x.code})`
              );
              return interaction.reply({ embeds: [Response] });
            });
        }
        break;
    }
  },
};

// Codigo Creado por ! Duban#7823 //
// Codigo Creado por ! Duban#7823 //
// Codigo Creado por ! Duban#7823 //
// Codigo Creado por ! Duban#7823 //
