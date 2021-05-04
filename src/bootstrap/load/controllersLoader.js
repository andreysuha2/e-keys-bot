import WelcomeController from "root-controllers/web/WelcomeController";
import SyncController from "root-controllers/web/SyncController";
import SubscribersController from "root-controllers/web/SubscribersController";

[
    WelcomeController, SyncController, SubscribersController
].forEach(Controller => new Controller());
