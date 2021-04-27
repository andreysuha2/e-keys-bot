import { Telegraf } from "telegraf";

class TelegramBot {
    constructor(token, name) {
        Object.defineProperties(this, {
            bot: { value: new Telegraf(token) },
            commands: {
                value: {
                    sync: {
                        read: "sync_read",
                        update: "sync_update"
                    }
                }
            }
        });
        this.bot.launch()
            .then(() => console.log(`Bot "${name}" launch: success`))
            .catch((e) => console.log(`Bot "${name}" launch: failed!`, e));
    }

    get syncOn() {
        const that = this;
        return {
            read(handler) { that.bot.command(that.commands.sync.read, handler); },
            update(handler) { that.bot.command(that.commands.sync.update, handler); }
        }
    }
}

export default TelegramBot;