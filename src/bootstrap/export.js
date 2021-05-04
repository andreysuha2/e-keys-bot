import Bot from "root-libs/Bot";
import BotControllers from "root-controllers/bot";
import Ekeys from "root-libs/Ekeys";

export const ekeys = new Ekeys(
    process.env.EKEYS_HOST,
    process.env.EKEYS_API_NAMESPACE,
    process.env.EKEYS_USERNAME,
    process.env.EKEYS_PASSWORD
);

export const bot = new Bot(
    process.env.BOT_ACCESS_TOKEN,
    process.env.BOT_USER_NAME
);

export const botControllers = BotControllers;