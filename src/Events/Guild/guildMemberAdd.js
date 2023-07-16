const { EmbedBuilder } = require("@discordjs/builders");
const { GuildMember, Embed } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",

  /**
   * @param {GuildMember} member
   */

  execute(member) {
    const { user, guild } = member;
    const welcomeChannel = member.guild.channels.cache.get(
      "1083472173672439818"
    );
    const welcomeMessage = `Welcome to the server, <@${member.id}>!`;
    const memberRole = member.guild.roles.cache.get("1083474591025999953");

    const welcomeEmbed = new EmbedBuilder()
      .setTitle("**New Member!**")
      .setDescription(welcomeMessage)
      .setColor("#00ff00")
      .addFields({ name: "Total members", value: `${guild.memberCount}` })
      .setTimestamp();

    welcomeChannel.send({ embeds: [welcomeEmbed] });
    member.roles.add(memberRole);
  },
};
