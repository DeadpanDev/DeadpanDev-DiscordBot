// prettier-ignore
function loadEvents(client) {
  const fs = require("fs");
  const ascii = require("ascii-table");
  const table = new ascii().setHeading("Events", "Status");

  const folders = fs.readdirSync("./src/Events");
  
  for (const folder of folders) {
    const files = fs
      .readdirSync(`./src/Events/${folder}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of files) {
      const event = require(`../Events/${folder}/${file}`);

      if (event.rest) {
        if (event.once)
          client.rest.on(event.name, (...args) => event.execute(...args, client));
        else client.rest.on(event.name, (...args) => event.execute(...args, client));
      } else {
        if (event.once)
          client.on(event.name, (...args) => event.execute(...args, client));
        else client.on(event.name, (...args) => event.execute(...args, client));
      }
      table.addRow(file, "Loaded");
      continue;
    }
  }
  return console.log(table.toString(), "\nLoaded Events");
}

module.exports = {
  loadEvents,
};
