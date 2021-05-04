export default (bot, controllers) => {
    // subscribe controller
    bot.start(controllers.subscribe.start.bind(controllers.subscribe));
    bot.listen("subscribe", controllers.subscribe.subscribe.bind(controllers.subscribe));
    bot.listen("unsubscribe", controllers.subscribe.unsubscribe.bind(controllers.subscribe));
    bot.listen("subscription_status", controllers.subscribe.status.bind(controllers.subscribe));
    // sync controller
    bot.listen("sync", controllers.sync.syncStart.bind(controllers.sync));
    bot.listen("sync_log", controllers.sync.syncGet.bind(controllers.sync));
};