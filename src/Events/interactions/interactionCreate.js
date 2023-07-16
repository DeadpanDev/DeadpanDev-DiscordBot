const { CommandInteraction, Client } = require("discord.js");

module.exports = {
  name: "interactionCreate",

  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */

  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      interaction.reply({
        content: "This command doesn't exist!",
        ephemeral: true,
      });
    }

    try {
      command.execute(interaction, client);
    } catch (error) {
      console.error(error);
      interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
