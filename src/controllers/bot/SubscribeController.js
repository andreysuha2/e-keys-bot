import Subscribers from "root-models/Subscribers";
import { Keyboard, Key } from "telegram-keyboard";
import { bot } from "root-bootstrap";

class SubscribeController {
    constructor() {
        Object.defineProperties(this, {
            phrases: {
                value: {
                    error: "Что-то пошло не так, попробуйте позже!",
                    cantSubscribe: "Вы не имеете доступа к обновлениям!",
                    subscribed: {
                        success: "Вы подписались на уведомления!",
                        already: "Вы подписаны на обновления!"
                    },
                    unsubscribed: {
                        success: "Вы отписались от уведомлений!",
                        already: "Вы не подписаны на обновления!"
                    }
                }
            }
        });
    }

    async start(ctx) {
        console.log("start", ctx.from);
        const keyboard = Keyboard.make(bot.keyboard.map(line => line.map(button => button.message))).reply(),
            message = ctx.from.username === "iceman935" ? "Привет, лох)" : "Привет, человек";
        ctx.reply(message, keyboard);
    }

    async _getSubscriber(ctx) {
        const { username, id } = ctx.from,
            acc = await Subscribers.findOne({ username, allowed: true });
        if(!acc) {
            ctx.reply(this.phrases.cantSubscribe);
            return false;
        }
        return { id, acc };
    }

    async subscribe(ctx) {
        const { acc, id } = await this._getSubscriber(ctx);
        if(!acc) return;
        if(acc.subscribed) ctx.reply(this.phrases.subscribed.already);
        else {
            acc.userId = id;
            acc.subscribed = true;
            await acc.save()
                .then(() => ctx.reply(this.phrases.subscribed.success))
                .catch(e => {
                    ctx.reply(this.phrases.error);
                    console.log(e)
                });

        }
    }

    async unsubscribe(ctx) {
        const { acc } = await this._getSubscriber(ctx);
        if(!acc) return;
        if(!acc.subscribed) ctx.reply(this.phrases.unsubscribed.already);
        else {
            acc.subscribed = false;
            await acc.save()
                .then(() => ctx.reply(this.phrases.unsubscribed.success))
                .catch(e => {
                    console.log(e);
                    ctx.reply(this.phrases.error);
                });
        }
    }

    async status(ctx) {
        const { acc } = await this._getSubscriber(ctx);
        if(!acc) return;
        if(acc.subscribed) ctx.reply(this.phrases.subscribed.already);
        else ctx.reply(this.phrases.unsubscribed.already);
    }
}

export default SubscribeController;