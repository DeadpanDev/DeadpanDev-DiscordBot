const { CommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",

  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      interaction.reply({ content: "An error has occurred.", ephemeral: true });
    }

    command.execute(interaction, client);
  },
};
