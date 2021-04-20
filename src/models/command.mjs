export class Command {

    constructor(name, args, description, commandController, adminOnly = false) {
        this.name = name;
        this.args = args;
        this.description = description;
        this.commandController = commandController;
        this.botController = commandController.botController;
        this.adminOnly = adminOnly;
    }

    run(message, args) {
        // Define the client, used to search users, guilds and channels.
        this.client = this.botController.client;
    }
}