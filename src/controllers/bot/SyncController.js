import { ekeys } from "root-bootstrap";
import postResource from "root-resources/post";
import SyncLog from "root-models/SyncLog";

class SyncController {
    syncStart(ctx) {
        ekeys.updateSync().then(async result => {
            const log = new SyncLog(result);
            await log.save();
            const message = postResource.update(result);
            await ctx.reply(message.title);
            ctx.reply(message.content);
        }).catch(e => {
            console.log(e);
            ctx.reply("Что-то пошло не так, попробуйте позже!");
        });
    }

    syncGet(ctx) {
        ekeys.getSync().then(async result => {
            const message = postResource.get(result);
            await ctx.reply(message.title);
            ctx.reply(message.content);
        }).catch(e => {
            console.log(e);
            ctx.reply("Что-то пошло не так, попробуйте позже!");
        })
    }
}

export default SyncController;