const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  CommandInteraction,
} = require("discord.js");

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { Users, Message, GuildMember, ThreadMember, Channel } = Partials;

const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [Users, Message, GuildMember, ThreadMember],
});

client.commands = new Collection();
client.config = require("./config.json");

client.login(client.config.botkey).then(() => {
  loadEvents(client);
  loadCommands(client);
});
