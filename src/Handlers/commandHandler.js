function loadCommands(client) {
  const fs = require("fs");
  const ascii = require("ascii-table");

  const table = new ascii().setHeading("Commands", "Status");

  let commandArray = [];

  const commandsFolders = fs.readdirSync("./src/Commands");
  for (const folder of commandsFolders) {
    const commandFiles = fs
      .readdirSync(`./src/Commands/${folder}`)
      .filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
      const commandFile = require(`../Commands/${folder}/${file}`);

      client.commands.set(commandFile.name, commandFile);

      commandArray.push(commandFile.data.toJSON());

      table.addRow(file, "Loaded");
      continue;
    }
  }

  client.application.commands.set(commandArray);

  return console.log(table.toString(), "\nLoaded Commands");
}

module.exports = { loadCommands };
