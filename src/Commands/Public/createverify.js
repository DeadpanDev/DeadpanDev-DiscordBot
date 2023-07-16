const {
	EmbedBuilder,
	ButtonStyle,
	ActionRowBuilder,
	ButtonBuilder,
	SlashCommandBuilder,
	CommandInteraction,
	PermissionFlagsBits,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("createverify")
		.setDescription("Set your verification channel")
		.addChannelOption(option =>
			option
				.setName("channel")
				.setDescription("The channel to verify in")
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	/**
	 * @param {CommandInteraction} interaction
	 */

	async execute(interaction) {
		const channel = interaction.options.getChannel("channel");
		const verifyEmbed = new EmbedBuilder()
			.setTitle("Verification")
			.setDescription(`Click the button below to verify yourself!`)
			.setColor("#00ff00");
		let sendChannel = channel.send({
			embeds: [verifyEmbed],
			components: [
				new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setCustomId("verify")
						.setLabel("Verify")
						.setStyle(ButtonStyle.Success)
				),
			],
		});
		if (!sendChannel) {
			return interaction.reply({
				content: "I cannot send messages in that channel.",
				ephemeral: true,
			});
		} else {
			return interaction.reply({
				content: "Successfully created a verification channel.",
				ephemeral: true,
			});
		}
	},
};
