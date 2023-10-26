// Codigo Creado por ! Duban#7823 //
// Codigo Creado por ! Duban#7823 //
// Codigo Creado por ! Duban#7823 //
// Codigo Creado por ! Duban#7823 //

const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const request = require("request");
const cheerio = require("cheerio");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("image")
    .setDescription("Raspa la imagen de google.")
    .addStringOption((option) =>
      option
        .setName("consulta")
        .setDescription("imagen que buscas.")
        .setRequired(true)
    ),
  async execute(interaction) {
    let query = interaction.options.getString("consulta");
    if (!query)
      interaction.reply({
        content: "Boi proporciona una consulta!",
        ephemeral: true,
      });

    let def;
    let embed = new EmbedBuilder();

    if (query.length) {
      function scrapeImages(searchTerm) {
        const url = `https://www.google.com/search?q=${searchTerm}&tbm=isch`;

        request(url, (error, response, html) => {
          if (!error && response.statusCode === 200) {
            const $ = cheerio.load(html);
            const imageUrls = [];

            $("img").each((i, el) => {
              imageUrls.push($(el).attr("src"));
            });
            let i = parseInt(Math.random() * 10);
            i = i == 0 ? (i += 1) : i;

            let img = imageUrls[i];
            console.log(img);
            const embed = new EmbedBuilder()
              .setColor("Blue")
              .setTitle(`**${query}**`)
              .setImage(img)
              .setDescription("**> Aqui esta tu imagen**")
              .setFooter({
                text: `Solicitado por ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({
                  dynamic: true,
                  size: 1024,
                }),
              })
              .setTimestamp();
            return interaction.reply({
              embeds: [embed],
              ephemeral: false,
            });
          }
        });
      }

      scrapeImages(query);
    } else {
      await interaction.reply({
        embeds: [
          {
            color: config.embedcolor ? config.embedcolor : null,
            title: "❌ Algo salió mal.",
          },
        ],
        ephemeral: false,
      });
    }
  },
};

// Codigo Creado por ! Duban#7823 //
// Codigo Creado por ! Duban#7823 //
// Codigo Creado por ! Duban#7823 //
// Codigo Creado por ! Duban#7823 //
