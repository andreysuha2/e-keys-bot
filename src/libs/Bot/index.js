import { Telegraf } from "telegraf";
import keyboard from "./keyboard";

class TelegramBot {
    constructor(token, name) {
        Object.defineProperties(this, {
            bot: { value: new Telegraf(token) },
            onReadyHandlers: { value: [], configurable: true },
            isReady: { value: false, configurable: true },
            keyboard: { value: keyboard }
        });

        this.bot.on("callback_query", (ctx) => {
            console.log(ctx);
        })

        this.bot.launch()
            .then(() => {
                this.onReadyHandlers.forEach((handler) => handler());
                Object.defineProperties(this, {
                    onReadyHandlers: { value: null },
                    isReady: { value: true }
                })
                console.log(`Bot "${name}" launch: success`)
            })
            .catch((e) => console.log(`Bot "${name}" launch: failed!`, e));
    }

    onReady(handler) {
        if(this.isReady) handler();
        else this.onReadyHandlers.push(handler);
    }

    start(handler) {
        this.bot.start(handler);
    }

    listen(name, handler) {
        this.command(name, handler);
        let command = this.keyboard.flat().find(({ command }) => command === name);
        if(command) this.hears(command.message, handler);
    }

    hears(text, handler) {
        this.bot.hears(text, handler);
    }

    command(name, handler) {
        this.bot.command(name, handler);
    }

    sendMessage(chatId, message) {
        return this.bot.telegram.sendMessage(chatId, message);
    }
}

export default TelegramBot;