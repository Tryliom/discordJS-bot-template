import dotenv from "dotenv";

import {BotController} from "./controller/botController.mjs";

dotenv.config();

// Initialize the bot controller
const botController = new BotController();