const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
} = require("discord.js");
const OpenAI = require("openai");

const config = require(`../../config.json`);

const openai = new OpenAI({
  apiKey: "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",
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chat-gpt")
    .setDescription("Puedes preguntarle algo a chatGPT")
    .addStringOption((option) =>
      option
        .setName("pregunta")
        .setDescription("Escribe la pregunta que le quieras hacer")
        .setMaxLength(300)
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const { options } = interaction;
    const pregunta = options.getString("pregunta");
    try {
      const res = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: pregunta,
        max_tokens: 2048,
        temperature: 0.5,
      });

      const embed = new EmbedBuilder()
        .setTitle("Preguntale a ChatGPT")
        .setAuthor({
          name: `${interaction.user.tag} Acaba de hacer una pregunta a ChatGPT`,
          iconURL: interaction.user.avatarURL({ dynamic: true }),
        })
        .setColor("Random")
        .setDescription(
          `Pregunta: \`\`\`${pregunta}\`\`\`\n\n Respuesta: \`\`\`${res.data.choices[0].text}\`\`\` `
        );

      return await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.log(error);
      return errReply(
        interaction,
        "Se produjo un error al tratar de realizar este comando",
        true
      );
    }
  },
};
