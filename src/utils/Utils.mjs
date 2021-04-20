import {config} from "../config/config.mjs";

export function isAdmin(message) {
    return config.admins.includes(message.author.id);
}