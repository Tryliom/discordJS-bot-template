import Discord from "discord.js";
import {config} from "../config/config.mjs";
import rm from "discord.js-reaction-menu";
import {CommandController} from "./cmdController.mjs";

export class BotController {
    constructor() {
        this.client = new Discord.Client();
        this.commandController = new CommandController(this);
        this.prefix = config.defaultPrefix;

        // Link the code to the current bot using his token
        this.client.login(process.env.token)
            .catch((reason) => {
                console.log(`Login failed for ${reason}`);
            });

        // Calls when the bot has been disconnected
        this.client.on("disconnect",  () => {
            this.client.connect();
        });

        // Calls after the bot is connected
        this.client.on('ready', async () => {
            console.log('Connected');
            await this.client.user.setActivity(`${this.prefix}Help`);
        });

        // Calls when the bot receive a message
        this.client.on('message', async message => {
            if (message.author.bot) return;
            if (message.content.startsWith(this.prefix)) {
                // Delete the command prefix on the message
                message.content = message.content.replace(this.prefix, "");
                // Send the command to the command controller
                this.commandController.onCommand(message);
            }
        });
    }

    /**
     *  Create a menu using reactions to navigate into a list of pages.
     * @param message The message object obtained from the message event
     * @param pages List of pages display for the user, can be a text and embed message
     */
    launchMenu(message, pages) {
        new rm.menu({
            channel: message.channel,
            userID: message.author.id,
            pages: pages,
            time: 180000
        });
    }

    /**
     * Get a basic embed message, used to create custom embed basic messages.
     * @param color Color at the left of the embed message
     * @param title Title of the embed message
     * @param description Description if specified of the embed message
     * @returns {module:"discord.js".MessageEmbed} A embed message
     */
    getGenericEmbedMessage(color, title, description = "") {
        const embedMessage = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle(title);

        if (description !== "")
            embedMessage.setDescription(description);

        return embedMessage;
    }

    /**
     * Get a embed message with a blue color.
     * @param title Title of the embed message
     * @param description Description if specified of the embed message
     * @returns {module:"discord.js".MessageEmbed} A embed message
     */
    getNeutralEmbedMessage(title, description = "") {
        return this.getGenericEmbedMessage("#0099ff", title, description);
    }

    /**
     * Get a embed message with a green color.
     * @param title Title of the embed message
     * @param description Description if specified of the embed message
     * @returns {module:"discord.js".MessageEmbed} A embed message
     */
    getGoodEmbedMessage(title, description = "") {
        return this.getGenericEmbedMessage("#11aa11", title, description);
    }

    /**
     * Get a embed message with a red color.
     * @param title Title of the embed message
     * @param description Description if specified of the embed message
     * @returns {module:"discord.js".MessageEmbed} A embed message
     */
    getBadEmbedMessage(title, description = "") {
        return this.getGenericEmbedMessage("#aa1111", title, description);
    }

    /**
     * Check if the author of the message is an admin.
     * @param message The message object obtained from the message event
     * @returns {boolean} True if the user is admin, false otherwise
     */
    isAdmin(message) {
        return config.admins.includes(message.author.id);
    }
}