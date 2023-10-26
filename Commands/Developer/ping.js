const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Te retorna pong"),
  execute(interaction) {
    interaction.reply({ content: "Pong" });
  },
};
