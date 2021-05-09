import { bot, ekeys } from "root-bootstrap";
import postResource from "root-resources/post";
import Controller from "core-controller";
import Subscribers from "root-models/Subscribers";
import SyncLog from "root-models/SyncLog";


class SyncController extends Controller {
    #limit = 10;

    constructor() {
        super({ name: "Sync" });
    }

    async syncStored(res, req) {
        const log = new SyncLog(req.body);
        await log.save();
        return true;
    }

    async onSync(res, req) {
        await this.syncStored(res, req);
        const preparedData = ekeys._mappedSyncData(req.body)
        if (preparedData.products.notInStock) {
            const message = postResource.update(preparedData),
                accounts = await Subscribers.find({allowed: true, subscribed: true});
            accounts.forEach(({userId}) => {
                bot.sendMessage(userId, message.title)
                    .then(() => bot.sendMessage(userId, message.content));
            });
        }
        return "ok";
    }

    async syncLog(res, req) {
        const page = Number(req.query.get("page")) || 1,
            offset = this.#limit * page - this.#limit,
            total = await SyncLog.countDocuments(),
            totalPages = Math.ceil(total / this.#limit),
            nextPage = page + 1,
            prevPage = page - 1;
        console.log(page);
        if(page > totalPages) {
            res.statusCode = 404;
            res.statusMessage = "Not fond"
            return null;
        }
        const logs = await SyncLog.find().skip(offset).limit(this.#limit).sort('-date');
        return {
            logs,
            pagination: {
                page,
                total,
                totalPages,
                nextPage: nextPage <= totalPages ? nextPage : null,
                prevPage: prevPage >= 1 ? prevPage : null
            }
        }
    }
}

export default SyncController;