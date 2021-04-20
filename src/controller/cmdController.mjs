import {Help} from "../models/commands/help.mjs";

export class CommandController {
    constructor(botController) {
        this.botController = botController;
        this.commands = [
            new Help(this)
        ];
    }

    onCommand(message) {
        for (let command of this.commands) {
            if (message.content.startsWith(command.name)) {
                command.run(message, message.content.split(" "));
            }
        }
    }
}