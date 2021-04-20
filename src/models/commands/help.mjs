import {Command} from "../command.mjs";
import {Util as utils} from "discord.js";

export class Help extends Command {
    constructor(commandController) {
        super("help", "", "Display the list of commands and their descriptions", commandController);
    }

    run(message, args) {
        super.run(message, args);

        const list = [];
        let embedMessage = this.botController.getGoodEmbedMessage("Help page");

        for (const command of this.commandController.commands) {
            const index = this.commandController.commands.indexOf(command);

            if (command.adminOnly && this.botController.isAdmin(message) || !command.adminOnly)
                embedMessage.addField(`${this.botController.prefix}${command.name} ${this.args}`, command.description);

            if (embedMessage.fields.length === 10 || (index + 1) === this.commandController.commands.length) {
                list.push(utils.cloneObject(embedMessage));
                embedMessage = this.botController.getGoodEmbedMessage("Help page");
            }
        }

        if (list.length > 1) {
            list.forEach(embed => embed.setFooter("Page " + (list.indexOf(embed) + 1) + "/" + list.length));
            this.botController.launchMenu(message, list);
        } else
            message.channel.send(list[0]);
    }
}