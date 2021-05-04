import Controller from "core-controller";
import Subscribers from "root-models/Subscribers";

class SubscribersController extends Controller {
    constructor() {
        super({ name: "Subscribers" });
    }

    async set(res, req) {
        const allAccounts = await Subscribers.find({});
        await Promise.all(allAccounts.map(async account => {
            account.allowed = req.body.includes(account.username);
            await account.save().catch(e => console.log(e));
        }));
        await Promise.all(req.body.map(async username => {
            let account = await Subscribers.findOne({ username });
            if(account) account.allowed = true;
            else account = new Subscribers({ username });
            await account.save().catch(e => console.log(e));
        }));
        return "ok";
    }

    get() {
        return Subscribers.find({ allowed: true }, "username");
    }
}

export default SubscribersController;