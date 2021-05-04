import { bot, ekeys } from "root-bootstrap";
import postResource from "root-resources/post";
import Controller from "core-controller";
import Subscribers from "root-models/Subscribers";

class SyncController extends Controller {
    constructor() {
        super({ name: "Sync" });
    }

    async onSync(res, req) {
        const message = postResource.update(ekeys._mappedSyncData(req.body)),
           accounts = await Subscribers.find({ allowed: true, subscribed: true });
        accounts.forEach(({ userId }) => {
            bot.sendMessage(userId, message.title)
                .then(() => bot.sendMessage(userId, message.content));
        });
    }
}

export default SyncController;