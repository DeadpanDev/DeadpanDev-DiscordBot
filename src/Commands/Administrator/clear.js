const {
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    EmbedBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription(
            "Clears the specified amount of messages from a target or channel."
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option =>
            option
                .setName("amount")
                .setDescription("The amount of messages to clear.")
                .setRequired(true)
        )
        .addUserOption(option =>
            option
                .setName("target")
                .setDescription("The target to clear messages from.")
                .setRequired(false)
        ),

    /**
     * @param {CommandInteraction} interaction
     */

    async execute(interaction) {
        const { channel, options } = interaction;

        const amount = options.getInteger("amount");
        const target = options.getUser("target");

        const messages = await channel.messages.fetch({
            limit: amount + 1,
        });

        const res = new EmbedBuilder().setColor("#FF0000");

        if (target) {
            let i = 0;
            const filtered = [];

            (await messages).forEach(msg => {
                if (msg.author.id === target.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                res.setDescription(
                    `Deleted ${messages.size} messages from ${target}.`
                );
                interaction.reply({ embeds: [res], ephemeral: true });
            });
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                res.setDescription(
                    `Deleted ${messages.size} messages from channel.`
                );
                interaction.reply({ embeds: [res], ephemeral: true });
            });
        }
    },
};
