import Ekeys from "root/Ekeys/index.js";
import Bot from "root/Bot/index.js";
import Server from "root/server.js";

class App {
    constructor() {
        Object.defineProperties(this, {
            ekeys: { value: new Ekeys(process.env.EKEYS_HOST, process.env.EKEYS_API_NAMESPACE) },
            bot: { value: new Bot(process.env.BOT_ACCESS_TOKEN, process.env.BOT_USER_NAME) },
            server: { value: new Server() }
        });
        this.bot.syncOn.read(this.syncRead.bind(this));
        this.bot.syncOn.update(this.syncUpdate.bind(this));
    }

    syncRead(ctx) {
        this.ekeys.getSync().then(data => this.postSyncData(ctx, data, "read")).catch((e) => {
            console.log(e);
            ctx.reply("Failed");
        })
    }

    syncUpdate(ctx) {
        this.ekeys.updateSync().then(data => this.postSyncData(ctx, data, "update")).catch((e) => {
            console.log(e);
            ctx.reply("Failed");
        })
    }

    postSyncData(ctx, data, type = "untyped") {
        console.log(data, type);
        const titles = {
            read: `Последня синхронизация: ${data.date}`,
            update: `Данные синхронизированы: ${data.date}`,
            untyped: `Данные синхронизации: ${data.date}`
        }
        const title = titles.hasOwnProperty(type) ? titles[type] : titles.untyped;
        ctx.reply(title)
            .then(() => {
                const message = [
                    [ "Статус", data.status ],
                    [ "Категорий синхронизировано", data.cats.synced ],
                    [ "Продуктов добавленно", data.products.added ],
                    [ "Продуктов обновленно", data.products.updated ],
                    [ "Продуктов нет в наличии", data.products.notInStock || null ]
                ].reduce((str, [ title, value ]) => {
                    if(value === null) str += `${title}: ${value}\n`;
                    return str;
                }, "");
                return ctx.reply(message);
            }).catch(e => console.log(e));
    }
}
export default App;